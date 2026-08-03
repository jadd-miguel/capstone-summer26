const API_PORT = 8000;

export const server = (endpoint: string): string => {
    let serverUrl = "";
    const { hostname } = window.location;
    if (hostname == "localhost" || hostname == "127.0.0.1") {
        serverUrl = `http://localhost:${API_PORT}`;
    }
    return `${serverUrl}${endpoint}`;
};

export const headers = {
    Accept: "text;application/json",
    "Content-Type": "application/json",
};

export type ResponseFormat = "json" | "text" | "blob" | "formData" | "arrayBuffer";

export const handleResponse = async (response: Response, responseFormat: ResponseFormat) => {
    return await (response as any)[responseFormat]();
};

export const post = async (url: string, body: any, responseFormat: ResponseFormat = "json") => {
    let response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    return handleResponse(response, responseFormat);
};

export const del = async (url: string, body: any, responseFormat: ResponseFormat = "json"): Promise<any> => {
    let response = await fetch(url, {
        method: "DELETE",
        headers,
        body: JSON.stringify(body),
    });
    return handleResponse(response, responseFormat);
};

export const get = async (url: string, id?: any, responseFormat: ResponseFormat = "json"): Promise<any> => {
    const fetchUrl = id ? `${url}?user_id=${id}` : url;
    let response = await fetch(fetchUrl);
    return handleResponse(response, responseFormat);
};

export const put = async (url: string, body: any, responseFormat: ResponseFormat = "json"): Promise<any> => {
    let response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
    });
    return handleResponse(response, responseFormat);
};

export const patch = async (url: string, body: any, responseFormat: ResponseFormat = "json"): Promise<any> => {
    let response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
    });
    return handleResponse(response, responseFormat);
};

const auth = {
    login: (body: any) => post(server("/login"), body),
    signup: (body: any) => post(server("/create_user"), body),
    logout: () => post(server("/logout"), null),
};

const agent = {
    generate_cover_letter: (body: any) => post(server("/cover_letter_agent"), body),
    generate_resume: (body: any) => post(server("/resume_agent"), body),
    discover_jobs: (body: any) => post(server("/discover_jobs"), body),
    refine_bullets: (body: any) => post(server("/refine_bullets"), body),
    benchmark: (body: any) => post(server("/benchmark_candidate"), body),
    persona_interview: (body: any) => post(server("/persona_interview"), body),
    score_resume: (body: any) => post(server("/score_resume"), body),
    generate_roadmap: (body: any) => post(server("/generate_roadmap"), body),
    generate_bridge_roles: (body: any) => post(server("/generate_bridge_roles"), body),
    gap_analysis: (body: any) => post(server("/gap_agent"), body),
};

const profiles = {
    get_jd: (body: any) => get(server("/jd"), body),
    get_quals: (body: any) => get(server("/quals"), body),
    patch_jd: (body: any) => patch(server("/jd"), body),
    patch_quals: (body: any) => patch(server("/quals"), body),
    post_jd: (body: any) => post(server("/jd"), body),
    post_qual: (body: any) => post(server("/quals"), body),
    post_name: (body: any) => post(server("/name"), body),
};

export { auth, agent, profiles };