import {
    Award, Briefcase, Building2, ClipboardList, FileCheck, Flag, Globe,
    GraduationCap, Landmark, School, Trophy, Users, Wallet, Wifi, Wrench,
} from "lucide-react";

const MAP = {
    "award": Award,
    "briefcase": Briefcase,
    "building-2": Building2,
    "clipboard-list": ClipboardList,
    "file-check": FileCheck,
    "flag": Flag,
    "globe": Globe,
    "graduation-cap": GraduationCap,
    "landmark": Landmark,
    "school": School,
    "trophy": Trophy,
    "users": Users,
    "wallet": Wallet,
    "wifi": Wifi,
    "wrench": Wrench,
};

export default function Icon({ name, className }) {
    const Cmp = MAP[name] || Briefcase;
    return <Cmp className={className} aria-hidden="true" />;
}
