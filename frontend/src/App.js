import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "@/lib/ConfigContext";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Listing from "@/pages/Listing";
import OpportunityDetail from "@/pages/OpportunityDetail";
import CareerGuides from "@/pages/CareerGuides";
import CareerGuideDetail from "@/pages/CareerGuideDetail";
import StaticPage from "@/pages/StaticPage";
import Contact from "@/pages/Contact";
import ReportOpportunity from "@/pages/ReportOpportunity";
import NotFound from "@/pages/NotFound";

const CATEGORY_SLUGS = [
    "jobs", "government-jobs", "private-jobs", "remote-jobs", "internships",
    "scholarships", "fully-funded-scholarships", "admissions", "fellowships",
    "training-programs", "apprenticeships", "entry-tests", "competitive-exams",
    "government-programs", "international-opportunities",
];

const STATIC_SLUGS = ["about", "how-it-works", "source-policy", "editorial-policy", "privacy-policy", "terms", "disclaimer"];

function App() {
    return (
        <ConfigProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Listing />} />
                        <Route path="/opportunities/:slug" element={<OpportunityDetail />} />
                        {CATEGORY_SLUGS.map((s) => (
                            <Route key={s} path={`/${s}`} element={<Listing categorySlug={s} />} />
                        ))}
                        <Route path="/career-guides" element={<CareerGuides />} />
                        <Route path="/career-guides/:slug" element={<CareerGuideDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/report-an-opportunity" element={<ReportOpportunity />} />
                        {STATIC_SLUGS.map((s) => (
                            <Route key={s} path={`/${s}`} element={<StaticPage slug={s} />} />
                        ))}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
                <Toaster position="top-center" richColors />
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
