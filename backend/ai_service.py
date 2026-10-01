"""AI provider abstraction for the content-transformation step of the pipeline.

Uses the Emergent universal LLM key via emergentintegrations. The provider/model
are configurable through env vars (AI_PROVIDER / AI_MODEL) so the AI backend can be
swapped without code changes. The transformation step extracts facts and never
invents salary, deadline, eligibility, vacancies, organization or application links.
"""
from __future__ import annotations

import json
import logging
import os
from typing import Optional

logger = logging.getLogger("pakopps.ai")

_SYSTEM = (
    "You are an information-extraction engine for an opportunities search platform. "
    "Extract ONLY facts explicitly present in the provided source text. "
    "Never invent salary, deadline, eligibility, vacancies, organization, application link, "
    "qualification, benefits or location. If a fact is not present, return null for it. "
    "Return strict JSON only."
)


def ai_enabled() -> bool:
    return bool(os.environ.get("EMERGENT_LLM_KEY"))


async def extract_opportunity(raw_text: str, source_url: str) -> Optional[dict]:
    """Extract structured fields from raw source text. Returns dict or None on failure.

    This is used by the discovery pipeline. It is intentionally conservative: any
    uncertainty results in null fields so the quality engine can reject thin records.
    """
    if not ai_enabled() or not raw_text:
        return None
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
    except Exception as exc:  # library missing
        logger.warning("emergentintegrations unavailable: %s", exc)
        return None

    provider = os.environ.get("AI_PROVIDER", "openai")
    model = os.environ.get("AI_MODEL", "gpt-5.4-mini")
    chat = LlmChat(
        api_key=os.environ["EMERGENT_LLM_KEY"],
        session_id=f"extract-{abs(hash(source_url)) % 100000}",
        system_message=_SYSTEM,
    ).with_model(provider, model)

    prompt = (
        "Extract the following fields as JSON: title, organization, opportunity_type, "
        "location, city, province, deadline (YYYY-MM-DD or null), qualification, "
        "salary, how_to_apply (array), eligibility (array), application_url.\n\n"
        f"SOURCE URL: {source_url}\nSOURCE TEXT:\n{raw_text[:6000]}"
    )
    try:
        resp = await chat.send_message(UserMessage(text=prompt))
        text = resp if isinstance(resp, str) else getattr(resp, "content", str(resp))
        start, end = text.find("{"), text.rfind("}")
        if start >= 0 and end > start:
            return json.loads(text[start:end + 1])
    except Exception as exc:
        logger.warning("AI extraction failed for %s: %s", source_url, exc)
    return None
