const API_PORT = 8000

export const server = (endpoint: string): string => {
	// Relative paths (i.e. not starting with http://...) resolve to the current IP:PORT
	let serverUrl = "";

	const { hostname } = window.location; // Read the current window URL hostname
	if (hostname == "localhost" || hostname == "127.0.0.1") {
		// If it's locally hosted
		// Then we want to use an absolte path http://localhost:9000
		serverUrl = `http://localhost:${API_PORT}`;
	}

	return `${serverUrl}${endpoint}`; // Build the rest of the url
};

export const headers = {
	// https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
	Accept: "text;application/json",
	// https://www.rfc-editor.org/rfc/rfc7231#section-3.1.1.5
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
	"Content-Type": "application/json",
};

export type ResponseFormat = "json" | "text" | "blob" | "formData" | "arrayBuffer";

export const handleResponse = async (response: Response, responseFormat: ResponseFormat) => {
	// Cast to 'any' to safely call dynamic string method keys in TypeScript
	return await (response as any)[responseFormat]();
};


export const post = async (url: string, body: any, responseFormat: ResponseFormat = "json") => {
	//console.log(JSON.stringify(body))
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

export const get = async (url: string, id:any, responseFormat: ResponseFormat = "json"): Promise<any> => {
	let response = await fetch(`${url}?user_id=${id}`);
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

//Bundle of api calls to handle login/signup/logout
const auth = {
	login: (body: any) => post(server("/login"), body),
	signup: (body: any) => post(server("/create_user"), body),
	logout: () => post(server("/logout"), null),
}

//Bundle of api calls for model
const agent = {
	generate_cover_letter: (body: any) => post(server("/cover_letter_agent"), body),
	generate_resume: (body: any) => post(server("/resume_agent"), body),
}

const profiles = {
	get_jd: (body: any) => get(server("/jd"), body),
	get_quals: (body: any) => get(server("/quals"), body),
	patch_jd: (body: any) => patch(server("/jd"), body),
	patch_quals: (body: any) => patch(server("/quals"), body),
	post_jd: (body: any) => post(server("/jd"), body),
	post_qual: (body: any) => post(server("/quals"), body),
	post_name: (body: any) => post(server("/name"), body),
}

export {
	auth,
	agent,
	profiles
}
