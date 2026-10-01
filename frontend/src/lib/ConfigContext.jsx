import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConfig } from "@/lib/api";

const ConfigContext = createContext(null);

const FALLBACK = {
    site_name: "PAKOPPS",
    contact_email: "contact@pakopps.com",
    ads: { enabled: false, provider: "adsense", client_id: "", slots: {} },
};

export function ConfigProvider({ children }) {
    const { data } = useQuery({ queryKey: ["config"], queryFn: getConfig, staleTime: Infinity });
    return <ConfigContext.Provider value={data || FALLBACK}>{children}</ConfigContext.Provider>;
}

export function useAppConfig() {
    return useContext(ConfigContext) || FALLBACK;
}
