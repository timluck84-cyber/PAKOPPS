import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API, timeout: 20000 });

export const getConfig = () => client.get("/config").then((r) => r.data);
export const getTaxonomy = () => client.get("/taxonomy").then((r) => r.data);
export const getStats = () => client.get("/stats").then((r) => r.data);
export const getHome = () => client.get("/home").then((r) => r.data);
export const listOpportunities = (params) =>
    client.get("/opportunities", { params }).then((r) => r.data);
export const getOpportunity = (slug) =>
    client.get(`/opportunities/${slug}`).then((r) => r.data);
export const autocomplete = (q) =>
    client.get("/autocomplete", { params: { q } }).then((r) => r.data);
export const listGuides = () => client.get("/career-guides").then((r) => r.data);
export const getGuide = (slug) => client.get(`/career-guides/${slug}`).then((r) => r.data);
export const createReport = (payload) => client.post("/reports", payload).then((r) => r.data);
export const createContact = (payload) => client.post("/contact", payload).then((r) => r.data);

export default client;
