"""Realistic DEMO seed dataset for PAKOPPS.

All records are clearly marked is_demo=True. Each record is passed through the
quality/dedupe/expiry engines exactly as a live discovered record would be, so the
public site only ever shows verified, non-duplicate, non-expired-by-default items.
"""
from __future__ import annotations

import re
from datetime import date, timedelta

from engines import compute_status, confidence_score, content_hash, source_hash

TODAY = date.today()


def rel(days: int) -> str:
    return (TODAY + timedelta(days=days)).isoformat()


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9\s-]", "", text.lower())
    s = re.sub(r"\s+", "-", s.strip())
    return re.sub(r"-+", "-", s)[:80]


_ROWS = []


def row(**k):
    _ROWS.append(k)


# ---------------- GOVERNMENT JOBS ----------------
row(title="Assistant Director (BS-17) - Federal Public Service Commission",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="Federal Public Service Commission (FPSC)",
    organization_description="Constitutional body responsible for recruitment to federal government posts in Pakistan.",
    source_name="FPSC Official Portal", source_url="https://www.fpsc.gov.pk/",
    official_url="https://www.fpsc.gov.pk/", application_url="https://www.fpsc.gov.pk/",
    location="Islamabad", province="Islamabad", city="Islamabad",
    education_level="Bachelor", qualification="Bachelor's degree (second division) from an HEC-recognised university",
    experience_required="No experience", age_limit="21-30 years (with permissible relaxation)",
    vacancies="24", salary="PKR 90,000 - 120,000 / month (BS-17)", application_fee="PKR 300 (bank challan)",
    deadline=rel(18),
    description="The Federal Public Service Commission invites applications from eligible Pakistani nationals for the post of Assistant Director (BS-17) in various federal departments. Selection is through a written examination followed by a psychological assessment and interview. Candidates must hold a bachelor's degree and meet the prescribed age and domicile requirements.",
    eligibility=["Pakistani nationality with valid CNIC", "Bachelor's degree in second division or higher", "Age between 21 and 30 years (relaxation as per rules)", "Fulfil domicile and quota requirements"],
    requirements=["Pass FPSC screening/written test", "Clear psychological assessment", "Qualify the panel interview"],
    documents_required=["CNIC copy", "Degree and transcripts", "Domicile certificate", "Recent photographs"],
    how_to_apply=["Register on the FPSC online portal", "Complete the application form and upload documents", "Deposit the application fee via bank challan", "Submit before the closing date"])

row(title="Lecturer in Computer Science (BS-17) - Punjab Public Service Commission",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="Punjab Public Service Commission (PPSC)",
    organization_description="Provincial commission responsible for recruitment to Punjab government posts.",
    source_name="PPSC Official Portal", source_url="https://www.ppsc.gop.pk/",
    official_url="https://www.ppsc.gop.pk/", application_url="https://www.ppsc.gop.pk/",
    location="Lahore", province="Punjab", city="Lahore",
    education_level="Master", qualification="Master's / 16 years education in Computer Science",
    experience_required="Fresh graduate", age_limit="21-35 years",
    vacancies="60", salary="PKR 95,000 - 130,000 / month (BS-17)", application_fee="PKR 700 (e-challan)",
    deadline=rel(10),
    description="The Punjab Public Service Commission announces vacancies for Lecturers in Computer Science in the Higher Education Department, Government of Punjab. Candidates with a relevant master's degree are encouraged to apply through the PPSC online system. Recruitment is based on a written test and interview.",
    eligibility=["Master's or equivalent (16 years) in Computer Science", "Punjab domicile", "Age 21-35 years with relaxation as per policy"],
    requirements=["Qualify PPSC written test", "Qualify interview"],
    documents_required=["CNIC", "Academic degrees and transcripts", "Domicile certificate"],
    how_to_apply=["Create an account on the PPSC portal", "Apply online for the advertised post", "Pay the e-challan fee", "Submit the application before the deadline"])

row(title="Educators (SESE/SSE) - Khyber Pakhtunkhwa via NTS",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="Elementary & Secondary Education Department, KP",
    source_name="National Testing Service (NTS)", source_url="https://nts.org.pk/",
    official_url="https://nts.org.pk/", application_url="https://nts.org.pk/",
    location="Peshawar", province="Khyber Pakhtunkhwa", city="Peshawar",
    education_level="Bachelor", qualification="Bachelor's degree with B.Ed / relevant teaching qualification",
    experience_required="Fresh graduate", age_limit="18-35 years", vacancies="1,200+",
    salary="PKR 40,000 - 65,000 / month", application_fee="PKR 500",
    deadline=rel(5),
    description="The Elementary & Secondary Education Department, Khyber Pakhtunkhwa, invites applications for Educator posts across districts. Candidates are shortlisted through an NTS screening test and merit. Teaching qualifications such as B.Ed are required for most categories.",
    eligibility=["Relevant bachelor's degree", "Teaching qualification (B.Ed/ADE) where required", "KP domicile of the relevant district"],
    requirements=["Qualify the NTS screening test", "Meet district-wise merit"],
    documents_required=["CNIC", "Degrees and certificates", "District domicile"],
    how_to_apply=["Download the NTS application form", "Deposit the test fee", "Submit the form to NTS before the deadline", "Appear in the screening test"])

row(title="Sub-Inspector (BS-14) - Sindh Police",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="Sindh Public Service Commission (SPSC)",
    source_name="SPSC Official Portal", source_url="https://www.spsc.gov.pk/",
    official_url="https://www.spsc.gov.pk/", application_url="https://www.spsc.gov.pk/",
    location="Karachi", province="Sindh", city="Karachi",
    education_level="Bachelor", qualification="Bachelor's degree from a recognised university",
    experience_required="No experience", age_limit="19-28 years", vacancies="150",
    salary="PKR 55,000 - 75,000 / month", application_fee="PKR 500",
    deadline=rel(25),
    description="The Sindh Public Service Commission invites applications for the post of Sub-Inspector in the Sindh Police. Candidates must meet physical standards in addition to academic and age criteria. Selection involves a written test, physical test and interview.",
    eligibility=["Pakistani national with Sindh domicile", "Bachelor's degree", "Meet physical standards"],
    requirements=["Clear written examination", "Pass physical fitness test", "Qualify interview"],
    documents_required=["CNIC", "Degree", "Domicile", "Medical fitness certificate"],
    how_to_apply=["Apply through the SPSC online portal", "Pay the fee via challan", "Submit before the closing date"])

row(title="Assistant Manager (BS-17) - WAPDA",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="Water and Power Development Authority (WAPDA)",
    source_name="WAPDA Careers", source_url="https://www.wapda.gov.pk/",
    official_url="https://www.wapda.gov.pk/", application_url="https://www.wapda.gov.pk/",
    location="Lahore", province="Punjab", city="Lahore",
    education_level="Bachelor", qualification="BE/BSc Engineering (Civil/Electrical/Mechanical)",
    experience_required="1-2 years", age_limit="22-32 years", vacancies="30",
    salary="PKR 110,000 - 150,000 / month", deadline=rel(22),
    description="WAPDA invites applications from qualified engineers for Assistant Manager positions across its hydel and administrative wings. Engineering graduates registered with PEC are encouraged to apply through the official recruitment portal.",
    eligibility=["BE/BSc Engineering in a relevant discipline", "PEC registration", "Age 22-32 years"],
    requirements=["Valid PEC registration", "Qualify test and interview"],
    documents_required=["CNIC", "Engineering degree", "PEC certificate"],
    how_to_apply=["Register on the WAPDA recruitment portal", "Submit the online application", "Appear for test and interview if shortlisted"])

row(title="Data Entry Operator (BS-12) - NADRA",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="National Database & Registration Authority (NADRA)",
    source_name="NADRA Careers", source_url="https://www.nadra.gov.pk/careers/",
    official_url="https://www.nadra.gov.pk/careers/", application_url="https://www.nadra.gov.pk/careers/",
    location="Multan", province="Punjab", city="Multan",
    education_level="Intermediate", qualification="Intermediate with computer literacy / typing speed 30 wpm",
    experience_required="No experience", age_limit="18-30 years", vacancies="45",
    salary="PKR 35,000 - 45,000 / month", deadline=rel(3),
    description="NADRA invites applications for Data Entry Operators at its regional registration centres. Candidates with good typing speed and basic computer skills are encouraged to apply. Selection is on merit after a typing and computer test.",
    eligibility=["Intermediate qualification", "Typing speed of at least 30 wpm", "Basic MS Office skills"],
    requirements=["Pass typing/computer test", "Qualify interview"],
    documents_required=["CNIC", "Educational certificates"],
    how_to_apply=["Apply online via NADRA careers page", "Appear for the typing test", "Attend the interview if shortlisted"])

# ---------------- PRIVATE JOBS ----------------
row(title="Software Engineer - Systems Limited",
    opportunity_type="jobs", category="private-jobs",
    organization="Systems Limited",
    organization_description="One of Pakistan's largest IT and BPO companies serving global clients.",
    source_name="Systems Limited Careers", source_url="https://www.systemsltd.com/careers",
    official_url="https://www.systemsltd.com/careers", application_url="https://www.systemsltd.com/careers",
    location="Lahore", province="Punjab", city="Lahore", remote_status="Hybrid", employment_type="Full-time",
    education_level="Bachelor", qualification="BS Computer Science / Software Engineering",
    experience_required="1-2 years", field_of_study="Computer Science",
    salary="PKR 150,000 - 250,000 / month", deadline=rel(20),
    description="Systems Limited is hiring Software Engineers to work on enterprise applications for international clients. The role involves developing and maintaining scalable web services using modern frameworks. Strong problem-solving skills and familiarity with cloud platforms are preferred.",
    eligibility=["BS in Computer Science or related field", "1-2 years of development experience", "Proficiency in a modern programming language"],
    requirements=["Experience with REST APIs and databases", "Familiarity with cloud (Azure/AWS)", "Good communication skills"],
    documents_required=["Updated CV", "Portfolio / GitHub (optional)"],
    how_to_apply=["Submit your application on the Systems Limited careers portal", "Complete the technical assessment", "Attend the interview if shortlisted"])

row(title="Management Trainee Officer (MTO) - Habib Bank Limited",
    opportunity_type="jobs", category="private-jobs",
    organization="Habib Bank Limited (HBL)",
    source_name="HBL Careers", source_url="https://www.hbl.com/careers",
    official_url="https://www.hbl.com/careers", application_url="https://www.hbl.com/careers",
    location="Karachi", province="Sindh", city="Karachi", employment_type="Full-time",
    education_level="Master", qualification="16 years education (Business/Finance preferred)",
    experience_required="Fresh graduate", salary="PKR 90,000 - 120,000 / month", deadline=rel(14),
    description="HBL's Management Trainee Officer programme develops fresh graduates into future banking leaders through structured rotations across business functions. Selected candidates receive mentorship, classroom training, and on-the-job exposure.",
    eligibility=["16 years of education from an HEC-recognised university", "Maximum age 26 years", "Strong academic record"],
    requirements=["Clear the assessment test", "Pass panel interviews"],
    documents_required=["CV", "Degree and transcripts", "CNIC"],
    how_to_apply=["Apply on the HBL careers portal", "Complete the online assessment", "Attend assessment centre and interview"])

row(title="Digital Marketing Executive - Jazz (VEON)",
    opportunity_type="jobs", category="private-jobs",
    organization="Jazz (Pakistan Mobile Communications Ltd)",
    source_name="Jazz Careers", source_url="https://jazz.com.pk/careers",
    official_url="https://jazz.com.pk/careers", application_url="https://jazz.com.pk/careers",
    location="Islamabad", province="Islamabad", city="Islamabad", employment_type="Full-time",
    education_level="Bachelor", qualification="Bachelor's in Marketing / Media / Business",
    experience_required="1-2 years", salary="PKR 120,000 - 160,000 / month", deadline=rel(16),
    description="Jazz is looking for a Digital Marketing Executive to plan and execute performance marketing campaigns across social and search channels. The role requires analytical skills and hands-on experience with campaign tools and analytics.",
    eligibility=["Bachelor's degree in a relevant field", "1-2 years of digital marketing experience"],
    requirements=["Experience with Meta/Google Ads", "Strong analytics and reporting skills"],
    documents_required=["CV", "Portfolio of campaigns (optional)"],
    how_to_apply=["Apply via the Jazz careers portal", "Complete the assessment", "Attend the interview"])

row(title="Relationship Manager - Meezan Bank",
    opportunity_type="jobs", category="private-jobs",
    organization="Meezan Bank Limited",
    source_name="Meezan Bank Careers", source_url="https://www.meezanbank.com/careers/",
    official_url="https://www.meezanbank.com/careers/", application_url="https://www.meezanbank.com/careers/",
    location="Faisalabad", province="Punjab", city="Faisalabad", employment_type="Full-time",
    education_level="Bachelor", qualification="Bachelor's / Master's in Business",
    experience_required="2-5 years", salary="PKR 100,000 - 140,000 / month", deadline=rel(28),
    description="Meezan Bank seeks experienced Relationship Managers to grow and manage a portfolio of corporate and SME clients in line with Islamic banking principles. The role focuses on client acquisition, service and portfolio management.",
    eligibility=["Bachelor's/Master's in Business or Finance", "2-5 years banking/sales experience"],
    requirements=["Strong client relationship skills", "Knowledge of Islamic banking products (preferred)"],
    documents_required=["CV", "Experience letters"],
    how_to_apply=["Apply on the Meezan Bank careers page", "Attend the interview if shortlisted"])

row(title="Mechanical Engineer - Engro Corporation",
    opportunity_type="jobs", category="private-jobs",
    organization="Engro Corporation",
    source_name="Engro Careers", source_url="https://www.engro.com/careers",
    official_url="https://www.engro.com/careers", application_url="https://www.engro.com/careers",
    location="Karachi", province="Sindh", city="Karachi", employment_type="Full-time",
    education_level="Bachelor", qualification="BE Mechanical Engineering (PEC registered)",
    experience_required="2-5 years", salary="PKR 180,000 - 260,000 / month", deadline=rel(30),
    description="Engro Corporation is hiring Mechanical Engineers for its manufacturing operations. The role involves maintenance planning, reliability engineering and process improvement in a large industrial environment.",
    eligibility=["BE Mechanical Engineering", "PEC registration", "2-5 years relevant experience"],
    requirements=["Experience in plant maintenance", "Knowledge of safety standards"],
    documents_required=["CV", "PEC certificate", "Experience letters"],
    how_to_apply=["Apply through the Engro careers portal", "Complete assessments", "Attend interviews"])

# ---------------- REMOTE JOBS ----------------
row(title="Remote Front-End Developer (React)",
    opportunity_type="jobs", category="remote-jobs", is_remote=True, is_international=True,
    organization="10Pearls",
    source_name="10Pearls Careers", source_url="https://10pearls.com/careers/",
    official_url="https://10pearls.com/careers/", application_url="https://10pearls.com/careers/",
    location="Remote (Pakistan)", country="Pakistan", remote_status="Remote", employment_type="Full-time",
    education_level="Bachelor", qualification="BS Computer Science or equivalent experience",
    experience_required="2-5 years", salary="PKR 200,000 - 350,000 / month", deadline=rel(21),
    description="10Pearls is hiring a fully remote Front-End Developer to build responsive web applications using React. You will collaborate with distributed teams across time zones and own features end-to-end. Strong fundamentals in JavaScript and modern tooling are required.",
    eligibility=["2+ years of React experience", "Strong HTML/CSS/JavaScript fundamentals", "Reliable internet and remote-work setup"],
    requirements=["Experience with state management and REST APIs", "Familiarity with Git and CI/CD"],
    documents_required=["CV", "GitHub / portfolio"],
    how_to_apply=["Apply on the 10Pearls careers portal", "Complete the coding assessment", "Attend remote interviews"])

row(title="Remote Content Writer (English)",
    opportunity_type="jobs", category="remote-jobs", is_remote=True,
    organization="ContentHive (Remote)",
    source_name="ContentHive Careers", source_url="https://contenthive.example/careers",
    official_url="https://contenthive.example/careers", application_url="https://contenthive.example/careers",
    location="Remote (Pakistan)", remote_status="Remote", employment_type="Contract",
    education_level="Bachelor", qualification="Bachelor's degree; excellent written English",
    experience_required="1-2 years", salary="PKR 80,000 - 120,000 / month", deadline=rel(12),
    description="A remote content studio is hiring English content writers to produce blog articles, website copy and SEO content for international clients. Strong research skills and the ability to meet deadlines are essential.",
    eligibility=["Excellent written English", "1-2 years writing experience", "Ability to work independently"],
    requirements=["Portfolio of published writing", "Basic SEO knowledge"],
    documents_required=["CV", "Writing samples"],
    how_to_apply=["Submit your application with writing samples", "Complete a paid test assignment", "Join the remote team if selected"])

row(title="Remote Customer Support Representative",
    opportunity_type="jobs", category="remote-jobs", is_remote=True, is_international=True,
    organization="SupportDesk Global (Remote)",
    source_name="SupportDesk Careers", source_url="https://supportdesk.example/careers",
    official_url="https://supportdesk.example/careers", application_url="https://supportdesk.example/careers",
    location="Remote (Pakistan)", remote_status="Remote", employment_type="Full-time",
    education_level="Intermediate", qualification="Intermediate or above; fluent English",
    experience_required="No experience", salary="PKR 90,000 - 130,000 / month", deadline=rel(9),
    description="Join a remote customer support team serving international customers via chat and email. Night-shift availability (aligned with US time zones) and fluent English are required. Full training is provided.",
    eligibility=["Fluent spoken and written English", "Willing to work US-aligned shifts", "Stable internet connection"],
    requirements=["Good typing speed", "Customer-first attitude"],
    documents_required=["CV"],
    how_to_apply=["Apply online", "Attend a spoken-English screening", "Complete onboarding training"])

# ---------------- INTERNSHIPS ----------------
row(title="Summer Internship Programme 2026 - HBL",
    opportunity_type="internships", category="internships",
    organization="Habib Bank Limited (HBL)",
    source_name="HBL Careers", source_url="https://www.hbl.com/careers",
    official_url="https://www.hbl.com/careers", application_url="https://www.hbl.com/careers",
    location="Karachi", province="Sindh", city="Karachi", employment_type="Internship",
    education_level="Bachelor", qualification="Enrolled in a bachelor's / master's programme",
    experience_required="No experience", stipend="PKR 30,000 / month", deadline=rel(15),
    description="HBL's Summer Internship Programme offers university students six weeks of practical banking experience across departments. Interns work on real projects with mentorship and may be considered for future graduate roles.",
    eligibility=["Currently enrolled undergraduate or graduate student", "Strong academic record"],
    requirements=["Available for the full internship period"],
    documents_required=["CV", "University enrolment proof"],
    how_to_apply=["Apply on the HBL careers portal", "Complete screening", "Attend interview if shortlisted"])

row(title="Engineering Internship - PTCL",
    opportunity_type="internships", category="internships",
    organization="Pakistan Telecommunication Company Limited (PTCL)",
    source_name="PTCL Careers", source_url="https://ptcl.com.pk/Careers",
    official_url="https://ptcl.com.pk/Careers", application_url="https://ptcl.com.pk/Careers",
    location="Islamabad", province="Islamabad", city="Islamabad", employment_type="Internship",
    education_level="Bachelor", qualification="Engineering/CS students (penultimate or final year)",
    experience_required="No experience", stipend="PKR 25,000 / month", deadline=rel(7),
    description="PTCL offers a structured engineering internship for telecom, electrical and computer engineering students. Interns gain exposure to network operations and IT infrastructure under experienced supervisors.",
    eligibility=["Enrolled engineering/CS student", "Penultimate or final year preferred"],
    requirements=["Basic technical knowledge of networks/IT"],
    documents_required=["CV", "Enrolment letter"],
    how_to_apply=["Apply via the PTCL careers page", "Attend interview if shortlisted"])

row(title="HEC Internship Programme for Fresh Graduates",
    opportunity_type="internships", category="internships", is_government=True,
    organization="Higher Education Commission (HEC)",
    source_name="HEC Pakistan", source_url="https://www.hec.gov.pk/",
    official_url="https://www.hec.gov.pk/", application_url="https://www.hec.gov.pk/",
    location="Islamabad", province="Islamabad", city="Islamabad", employment_type="Internship",
    education_level="Bachelor", qualification="Fresh graduates (within last 2 years)",
    experience_required="Fresh graduate", stipend="PKR 30,000 / month", deadline=rel(11),
    description="The Higher Education Commission offers an internship programme that places fresh graduates in public-sector organisations to build practical skills and employability. Internships typically run for six months.",
    eligibility=["Graduated within the last two years", "HEC-recognised degree", "Pakistani national"],
    requirements=["Available for the full programme"],
    documents_required=["CV", "Degree", "CNIC"],
    how_to_apply=["Register on the HEC internship portal", "Submit the application", "Await placement based on merit"])

# ---------------- SCHOLARSHIPS (incl. fully funded / international) ----------------
row(title="Fulbright Foreign Student Program 2026 (Fully Funded)",
    opportunity_type="scholarships", category="fully-funded-scholarships", is_fully_funded=True, is_international=True,
    organization="United States Educational Foundation in Pakistan (USEFP)",
    organization_description="Administers Fulbright and other US exchange programmes in Pakistan.",
    source_name="USEFP", source_url="https://www.usefp.org/",
    official_url="https://www.usefp.org/", application_url="https://www.usefp.org/",
    country="United States", study_level="Master / PhD", field_of_study="All disciplines",
    funding_type="Fully Funded", tuition_coverage="Full tuition", living_allowance="Monthly stipend + travel + health insurance",
    education_level="Bachelor", qualification="16 years of education for Master's; 18 years for PhD",
    nationality_requirement="Pakistani nationals (not holding US citizenship/residency)",
    deadline=rel(40),
    description="The Fulbright Program offers fully funded Master's and PhD scholarships for Pakistani students to study at leading universities in the United States. The award covers tuition, living stipend, travel and health insurance. Selection is highly competitive and merit-based.",
    eligibility=["Pakistani nationality", "16 years of education for Master's (18 for PhD)", "Strong academic record", "Valid test scores (GRE/TOEFL as required)"],
    requirements=["Statement of purpose", "Academic transcripts", "Letters of recommendation"],
    documents_required=["Transcripts and degrees", "Test scores", "References", "Statement of purpose"],
    how_to_apply=["Create an account on the USEFP application portal", "Complete the Fulbright application", "Submit supporting documents and references", "Attend interview if shortlisted"])

row(title="Chevening Scholarship 2026/27 (Fully Funded)",
    opportunity_type="scholarships", category="fully-funded-scholarships", is_fully_funded=True, is_international=True,
    organization="Chevening (UK Government)",
    source_name="Chevening Official", source_url="https://www.chevening.org/",
    official_url="https://www.chevening.org/", application_url="https://www.chevening.org/scholarship/pakistan/",
    country="United Kingdom", study_level="Master", field_of_study="Any one-year master's programme",
    funding_type="Fully Funded", tuition_coverage="Full tuition", living_allowance="Monthly stipend + travel + visa",
    education_level="Bachelor", qualification="Undergraduate degree + 2 years work experience",
    nationality_requirement="Pakistani citizens", deadline=rel(55),
    description="Chevening offers fully funded one-year master's scholarships in the UK for outstanding professionals with leadership potential. The award covers tuition, living expenses, flights and visa costs. Applicants must have work experience and intend to return to Pakistan.",
    eligibility=["Pakistani citizenship", "Completed undergraduate degree", "At least 2 years (2,800 hours) of work experience", "Return to Pakistan for a minimum of two years"],
    requirements=["Unconditional UK university offer by the deadline", "English language requirement"],
    documents_required=["Degree certificates", "Work experience proof", "References", "University offer"],
    how_to_apply=["Apply on the Chevening online portal", "Select up to three eligible UK courses", "Submit documents and references", "Attend interview if shortlisted"])

row(title="DAAD Scholarships for Development-Related Postgraduate Courses",
    opportunity_type="scholarships", category="fully-funded-scholarships", is_fully_funded=True, is_international=True,
    organization="German Academic Exchange Service (DAAD)",
    source_name="DAAD", source_url="https://www.daad.de/en/",
    official_url="https://www.daad.de/en/", application_url="https://www.daad.de/en/",
    country="Germany", study_level="Master / PhD", field_of_study="Development-related subjects",
    funding_type="Fully Funded", tuition_coverage="Full", living_allowance="Monthly stipend + travel + insurance",
    education_level="Bachelor", qualification="Bachelor's degree + relevant work experience",
    deadline=rel(60),
    description="DAAD offers fully funded postgraduate scholarships in Germany for professionals from developing countries, including Pakistan, in development-related fields. The scholarship includes a monthly stipend, travel allowance and health insurance.",
    eligibility=["Bachelor's degree in a relevant subject", "At least two years of professional experience", "Nationals of eligible developing countries"],
    requirements=["Admission to an eligible German programme", "Language requirement (English/German)"],
    documents_required=["Degrees and transcripts", "Work experience letters", "Language certificate"],
    how_to_apply=["Choose an eligible DAAD programme", "Apply through the university/DAAD portal", "Submit required documents before the deadline"])

row(title="HEC Need-Based Scholarship Programme 2026",
    opportunity_type="scholarships", category="scholarships", is_government=True,
    organization="Higher Education Commission (HEC)",
    source_name="HEC Pakistan", source_url="https://www.hec.gov.pk/",
    official_url="https://www.hec.gov.pk/", application_url="https://www.hec.gov.pk/",
    country="Pakistan", study_level="Undergraduate", field_of_study="All disciplines",
    funding_type="Partial / Need-Based", tuition_coverage="Tuition + living stipend for eligible students",
    education_level="Intermediate", qualification="Enrolled undergraduate students at partner universities",
    deadline=rel(33),
    description="The HEC Need-Based Scholarship supports talented but financially disadvantaged students enrolled in undergraduate programmes at participating public-sector universities. It covers tuition fees and provides a living stipend based on assessed need.",
    eligibility=["Enrolled in an eligible undergraduate programme", "Demonstrated financial need", "Satisfactory academic performance"],
    requirements=["Financial need assessment", "University nomination"],
    documents_required=["CNIC / B-Form", "Income proof", "Enrolment proof"],
    how_to_apply=["Apply through your university's financial aid office", "Complete the need-assessment form", "Submit supporting documents"])

row(title="Turkiye Burslari Scholarship 2026 (Fully Funded)",
    opportunity_type="scholarships", category="fully-funded-scholarships", is_fully_funded=True, is_international=True,
    organization="Government of Turkiye",
    source_name="Turkiye Burslari", source_url="https://www.turkiyeburslari.gov.tr/en",
    official_url="https://www.turkiyeburslari.gov.tr/en", application_url="https://www.turkiyeburslari.gov.tr/en",
    country="Turkiye", study_level="Undergraduate / Master / PhD", field_of_study="All disciplines",
    funding_type="Fully Funded", tuition_coverage="Full tuition", living_allowance="Monthly stipend + accommodation + flights",
    education_level="Matric", qualification="Completed previous level of education with required grades",
    deadline=rel(48),
    description="Turkiye Burslari is a fully funded government scholarship for international students to study in Turkiye at undergraduate, master's and PhD levels. It covers tuition, monthly stipend, accommodation, health insurance and return flights.",
    eligibility=["International student (not Turkish citizen)", "Required academic grades for the level applied", "Age limits per level"],
    requirements=["Academic transcripts", "Statement of purpose"],
    documents_required=["Diplomas and transcripts", "Passport/ID", "Reference and motivation letter"],
    how_to_apply=["Apply on the official Turkiye Burslari portal during the application window", "Upload documents", "Attend interview if shortlisted"])

row(title="Chinese Government Scholarship (CSC) 2026 - Pakistan",
    opportunity_type="scholarships", category="fully-funded-scholarships", is_fully_funded=True, is_international=True,
    organization="China Scholarship Council (CSC)",
    source_name="China Scholarship Council", source_url="https://www.campuschina.org/",
    official_url="https://www.campuschina.org/", application_url="https://www.campuschina.org/",
    country="China", study_level="Bachelor / Master / PhD", field_of_study="All disciplines",
    funding_type="Fully Funded", tuition_coverage="Full tuition", living_allowance="Monthly stipend + accommodation + insurance",
    education_level="Intermediate", qualification="Completed previous level with good grades",
    deadline=rel(2),
    description="The Chinese Government Scholarship supports international students to pursue degrees at top Chinese universities. It covers tuition, accommodation, a monthly living stipend and comprehensive medical insurance.",
    eligibility=["Non-Chinese citizen in good health", "Required academic level and grades", "Within prescribed age limits"],
    requirements=["University pre-admission (recommended)", "Language proficiency as required"],
    documents_required=["Transcripts and degrees", "Study plan", "Recommendation letters", "Medical form"],
    how_to_apply=["Apply through the CSC portal and a chosen university", "Submit documents before the deadline"])

# ---------------- ADMISSIONS ----------------
row(title="NUST Undergraduate Admissions 2026 (NET)",
    opportunity_type="admissions", category="admissions",
    organization="National University of Sciences & Technology (NUST)",
    organization_description="A leading public research university in Pakistan.",
    source_name="NUST Admissions", source_url="https://ugadmissions.nust.edu.pk/",
    official_url="https://ugadmissions.nust.edu.pk/", application_url="https://ugadmissions.nust.edu.pk/",
    location="Islamabad", province="Islamabad", city="Islamabad", country="Pakistan",
    study_level="Undergraduate", education_level="Intermediate",
    qualification="FSc / A-Levels / equivalent with required marks", application_fee="PKR 4,500 (per NET attempt)",
    deadline=rel(26),
    description="NUST invites applications for undergraduate admissions across engineering, computing, business and sciences. Admission is based on the NUST Entry Test (NET) and academic record. Candidates can attempt the NET multiple times to improve their score.",
    eligibility=["FSc/A-Levels or equivalent with minimum required marks", "Meet programme-specific prerequisites"],
    requirements=["Appear in the NUST Entry Test (NET)", "Meet merit for the chosen programme"],
    documents_required=["Matric and FSc certificates", "CNIC/B-Form", "Photographs"],
    how_to_apply=["Register on the NUST admissions portal", "Pay the NET fee and book a test slot", "Appear in the NET", "Apply for programmes on merit"])

row(title="LUMS Undergraduate Admissions 2026",
    opportunity_type="admissions", category="admissions",
    organization="Lahore University of Management Sciences (LUMS)",
    source_name="LUMS Admissions", source_url="https://admission.lums.edu.pk/",
    official_url="https://admission.lums.edu.pk/", application_url="https://admission.lums.edu.pk/",
    location="Lahore", province="Punjab", city="Lahore", country="Pakistan",
    study_level="Undergraduate", education_level="Intermediate",
    qualification="A-Levels / FSc / equivalent", application_fee="PKR 6,000",
    deadline=rel(35),
    description="LUMS invites applications for its undergraduate programmes in management, computing, engineering, economics and humanities. Admission is based on a holistic review including academics, the LUMS admission test or SAT, and supporting documents. Need-based financial aid is available.",
    eligibility=["A-Levels/FSc or equivalent", "Meet minimum academic requirements"],
    requirements=["LUMS admission test or acceptable SAT score", "Complete application review"],
    documents_required=["Academic transcripts", "CNIC/B-Form", "Financial aid documents (if applying)"],
    how_to_apply=["Create an account on the LUMS admissions portal", "Complete the application", "Submit test scores and documents"])

row(title="FAST-NUCES Admissions Spring 2026",
    opportunity_type="admissions", category="admissions",
    organization="FAST National University (FAST-NUCES)",
    source_name="FAST Admissions", source_url="https://www.nu.edu.pk/admissions",
    official_url="https://www.nu.edu.pk/admissions", application_url="https://www.nu.edu.pk/admissions",
    location="Lahore", province="Punjab", city="Lahore", country="Pakistan",
    study_level="Undergraduate", education_level="Intermediate",
    qualification="FSc / A-Levels with required marks", application_fee="PKR 2,000",
    deadline=rel(4),
    description="FAST-NUCES invites applications for undergraduate computing, engineering and management programmes for the Spring 2026 intake. Admission is based on the FAST entry test and academic record across its campuses.",
    eligibility=["FSc/A-Levels or equivalent with minimum marks", "Meet programme prerequisites"],
    requirements=["Appear in the FAST entry test", "Meet merit"],
    documents_required=["Matric and FSc certificates", "CNIC/B-Form"],
    how_to_apply=["Apply on the FAST admissions portal", "Pay the test fee", "Appear in the entry test"])

# ---------------- FELLOWSHIPS ----------------
row(title="Research Fellowship in Public Policy 2026",
    opportunity_type="fellowships", category="fellowships", is_international=False,
    organization="Pakistan Institute of Development Economics (PIDE)",
    source_name="PIDE", source_url="https://pide.org.pk/",
    official_url="https://pide.org.pk/", application_url="https://pide.org.pk/",
    location="Islamabad", province="Islamabad", city="Islamabad", country="Pakistan",
    education_level="Master", qualification="Master's/MPhil in Economics, Public Policy or related field",
    experience_required="1-2 years", stipend="PKR 120,000 / month", deadline=rel(29),
    description="PIDE offers a research fellowship for early-career researchers to work on public policy and development economics projects. Fellows contribute to publications and policy briefs under senior researchers and receive a monthly stipend.",
    eligibility=["Master's/MPhil in a relevant field", "Strong research and writing skills"],
    requirements=["Research proposal", "Writing sample"],
    documents_required=["CV", "Degrees", "Research proposal", "References"],
    how_to_apply=["Submit your application and research proposal via the PIDE portal", "Attend interview if shortlisted"])

row(title="Science & Technology Fellowship (Postdoctoral)",
    opportunity_type="fellowships", category="fellowships", is_government=True,
    organization="Pakistan Science Foundation (PSF)",
    source_name="Pakistan Science Foundation", source_url="https://www.psf.gov.pk/",
    official_url="https://www.psf.gov.pk/", application_url="https://www.psf.gov.pk/",
    location="Islamabad", province="Islamabad", city="Islamabad", country="Pakistan",
    education_level="PhD", qualification="PhD in a natural sciences / engineering discipline",
    experience_required="No experience", stipend="PKR 150,000 / month", deadline=rel(45),
    description="The Pakistan Science Foundation offers postdoctoral fellowships supporting research in priority science and technology areas. Fellows are hosted by national research institutes and receive a monthly stipend and research support.",
    eligibility=["PhD in a relevant discipline", "Within the eligible age limit"],
    requirements=["Research plan aligned with national priorities", "Host institute endorsement"],
    documents_required=["PhD degree", "Research plan", "Publications list"],
    how_to_apply=["Apply through the PSF fellowship portal", "Submit research plan and documents"])

# ---------------- TRAINING PROGRAMS ----------------
row(title="DigiSkills.pk Free Online Training (Freelancing & IT)",
    opportunity_type="training-programs", category="training-programs", is_government=True, is_remote=True,
    organization="DigiSkills Training Program (Ignite / MoITT)",
    source_name="DigiSkills", source_url="https://digiskills.pk/",
    official_url="https://digiskills.pk/", application_url="https://digiskills.pk/",
    location="Online (Pakistan)", country="Pakistan", remote_status="Remote",
    education_level="Matric", qualification="Basic computer and internet literacy",
    experience_required="No experience", deadline=rel(13),
    description="DigiSkills.pk offers free government-backed online training in freelancing, digital marketing, e-commerce, graphic design and more. Courses are self-paced with certificates on completion, aimed at building Pakistan's digital workforce.",
    eligibility=["Pakistani national", "Access to a computer and internet"],
    requirements=["Complete course modules and assessments"],
    documents_required=["CNIC for registration"],
    how_to_apply=["Register for free on DigiSkills.pk", "Enrol in a batch", "Complete the training to earn a certificate"])

row(title="NAVTTC Skills Development Program (Various Trades)",
    opportunity_type="training-programs", category="training-programs", is_government=True,
    organization="National Vocational & Technical Training Commission (NAVTTC)",
    source_name="NAVTTC", source_url="https://navttc.gov.pk/",
    official_url="https://navttc.gov.pk/", application_url="https://navttc.gov.pk/",
    location="Nationwide", country="Pakistan", province="Punjab", city="Lahore",
    education_level="Matric", qualification="Matric (varies by trade)",
    experience_required="No experience", deadline=rel(8),
    description="NAVTTC offers free skills-development courses in high-demand trades including IT, construction, hospitality and renewable energy. Training is delivered through partner institutes nationwide with a focus on employability and stipends for eligible trainees.",
    eligibility=["Pakistani national", "Meet trade-specific education requirements", "Within eligible age range"],
    requirements=["Complete the training programme"],
    documents_required=["CNIC/B-Form", "Educational certificates"],
    how_to_apply=["Apply through the NAVTTC online portal", "Select a trade and institute", "Attend classes after selection"])

# ---------------- APPRENTICESHIPS ----------------
row(title="Apprenticeship Programme - Pakistan Steel Mills",
    opportunity_type="apprenticeships", category="apprenticeships", is_government=True,
    organization="Pakistan Steel Mills Corporation",
    source_name="Pakistan Steel Mills", source_url="https://www.paksteel.com.pk/",
    official_url="https://www.paksteel.com.pk/", application_url="https://www.paksteel.com.pk/",
    location="Karachi", province="Sindh", city="Karachi", country="Pakistan",
    education_level="Matric", qualification="Matric with Science / relevant trade certificate (DAE preferred)",
    experience_required="No experience", stipend="PKR 20,000 / month", deadline=rel(17),
    description="Pakistan Steel Mills offers an apprenticeship programme providing hands-on technical training in mechanical, electrical and metallurgical trades. Apprentices receive a monthly stipend and a completion certificate recognised by the trade testing board.",
    eligibility=["Matric with Science or DAE in a relevant trade", "Within eligible age limit"],
    requirements=["Complete the apprenticeship term", "Pass the trade test"],
    documents_required=["CNIC/B-Form", "Matric/DAE certificate"],
    how_to_apply=["Apply through the Pakistan Steel Mills apprenticeship notice", "Appear for test/interview", "Join after selection"])

# ---------------- ENTRY TESTS ----------------
row(title="MDCAT 2026 Registration (Medical & Dental College Admission Test)",
    opportunity_type="entry-tests", category="entry-tests", is_government=True,
    organization="Pakistan Medical & Dental Council (PMDC)",
    source_name="PMDC", source_url="https://pmdc.pk/",
    official_url="https://pmdc.pk/", application_url="https://pmdc.pk/",
    location="Nationwide", country="Pakistan", province="Punjab", city="Lahore",
    education_level="Intermediate", qualification="FSc Pre-Medical or equivalent",
    experience_required="No experience", application_fee="PKR 6,500", deadline=rel(6),
    description="The Medical & Dental College Admission Test (MDCAT) is the mandatory national entry test for admission to MBBS and BDS programmes in Pakistan. Registration is open for candidates who have completed FSc Pre-Medical or an equivalent qualification.",
    eligibility=["FSc Pre-Medical or equivalent with minimum required marks", "Pakistani national or eligible category"],
    requirements=["Register and appear in the MDCAT on the scheduled date"],
    documents_required=["Matric and FSc certificates", "CNIC/B-Form", "Photograph"],
    how_to_apply=["Register on the official MDCAT portal", "Pay the test fee", "Download the roll-number slip", "Appear in the test"])

row(title="ECAT 2026 Registration (Engineering College Admission Test)",
    opportunity_type="entry-tests", category="entry-tests", is_government=True,
    organization="University of Engineering & Technology (UET) Lahore",
    source_name="UET Lahore", source_url="https://www.uet.edu.pk/",
    official_url="https://www.uet.edu.pk/", application_url="https://www.uet.edu.pk/",
    location="Lahore", province="Punjab", city="Lahore", country="Pakistan",
    education_level="Intermediate", qualification="FSc Pre-Engineering or equivalent",
    experience_required="No experience", application_fee="PKR 3,500", deadline=rel(19),
    description="The Engineering College Admission Test (ECAT) is conducted by UET Lahore for admission to engineering programmes in Punjab. Candidates who have completed FSc Pre-Engineering or an equivalent qualification are eligible to register.",
    eligibility=["FSc Pre-Engineering or equivalent", "Meet minimum marks requirement"],
    requirements=["Register and appear in the ECAT"],
    documents_required=["Matric and FSc certificates", "CNIC/B-Form"],
    how_to_apply=["Register on the UET ECAT portal", "Pay the fee", "Appear in the test"])

# ---------------- COMPETITIVE EXAMS ----------------
row(title="CSS Competitive Examination 2027 - Registration",
    opportunity_type="competitive-exams", category="competitive-exams", is_government=True,
    organization="Federal Public Service Commission (FPSC)",
    source_name="FPSC Official Portal", source_url="https://www.fpsc.gov.pk/",
    official_url="https://www.fpsc.gov.pk/", application_url="https://www.fpsc.gov.pk/",
    location="Nationwide", country="Pakistan", province="Islamabad", city="Islamabad",
    education_level="Bachelor", qualification="Bachelor's degree (second division) from a recognised university",
    experience_required="No experience", age_limit="21-30 years", application_fee="PKR 2,200",
    deadline=rel(50),
    description="The Central Superior Services (CSS) Competitive Examination is conducted by FPSC for recruitment to Pakistan's premier civil service groups. Graduates meeting the age and qualification criteria can register to appear in the written examination followed by medical, psychological and viva assessments.",
    eligibility=["Pakistani national", "Bachelor's degree in second division", "Age 21-30 years (relaxation as per rules)"],
    requirements=["Appear in the written examination", "Clear medical, psychological and viva"],
    documents_required=["CNIC", "Degree and transcripts", "Domicile"],
    how_to_apply=["Register on the FPSC CSS portal", "Fill the detailed application form", "Deposit the fee", "Submit before the deadline"])

# ---------------- GOVERNMENT PROGRAMS ----------------
row(title="Prime Minister's Youth Business & Agriculture Loan Scheme",
    opportunity_type="government-programs", category="government-programs", is_government=True,
    organization="Prime Minister's Youth Programme",
    source_name="PM Youth Programme", source_url="https://pmyp.gov.pk/",
    official_url="https://pmyp.gov.pk/", application_url="https://pmyp.gov.pk/",
    location="Nationwide", country="Pakistan", province="Punjab", city="Lahore",
    education_level="Matric", qualification="Pakistani nationals aged 21-45 with a viable business plan",
    experience_required="No experience", deadline=rel(38),
    description="The Prime Minister's Youth Business & Agriculture Loan Scheme provides subsidised loans to help young entrepreneurs and farmers start or expand businesses. Loans are disbursed through partner banks with concessional markup rates for eligible applicants.",
    eligibility=["Pakistani national aged 21-45 (18+ for IT/freelancers)", "Viable business plan", "Meet bank eligibility criteria"],
    requirements=["Submit a business plan", "Complete bank due diligence"],
    documents_required=["CNIC", "Business plan", "Bank account details"],
    how_to_apply=["Apply online via the PM Youth Programme portal", "Select a partner bank", "Submit documents for loan processing"])

# ---------------- An intentionally EXPIRED record (to prove the expiry engine) ----------------
row(title="Accounts Officer (BS-16) - Provincial Department (Closed)",
    opportunity_type="jobs", category="government-jobs", is_government=True,
    organization="Provincial Finance Department",
    source_name="PPSC Official Portal", source_url="https://www.ppsc.gop.pk/archive-ao-2025",
    official_url="https://www.ppsc.gop.pk/", application_url="https://www.ppsc.gop.pk/",
    location="Lahore", province="Punjab", city="Lahore",
    education_level="Bachelor", qualification="B.Com / BBA (Finance)",
    experience_required="1-2 years", vacancies="12", salary="PKR 70,000 / month",
    deadline=rel(-6),
    description="Applications were invited for the post of Accounts Officer (BS-16) in the Provincial Finance Department. The application window has now closed. This record is retained as historical information; please check the official portal for current openings.",
    eligibility=["B.Com/BBA in Finance", "Relevant experience"],
    requirements=["Qualify written test and interview"],
    documents_required=["CNIC", "Degree", "Domicile"],
    how_to_apply=["Applications closed. Visit the official PPSC portal for current vacancies."])


def _build_records():
    records = []
    for r in _ROWS:
        rec = dict(r)
        rec.setdefault("country", "Pakistan")
        for flag in ("is_government", "is_remote", "is_international", "is_fully_funded", "source_closed"):
            rec.setdefault(flag, False)
        rec["slug"] = slugify(rec["title"])
        rec["content_hash"] = content_hash(rec)
        rec["source_hash"] = source_hash(rec)
        rec["status"] = compute_status(rec)
        rec["confidence_score"] = confidence_score(rec)
        rec["verification_status"] = "Verified"
        rec["is_demo"] = True
        records.append(rec)
    return records


RECORDS = _build_records()
