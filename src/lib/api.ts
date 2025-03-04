const API_BASE_URL = process.env.RAILS_API_URL || 'http://localhost:3001';
const API_KEY = process.env.RAILS_API_KEY;

interface RequestOptions extends RequestInit {
  data?: any;
}

export async function fetchApi(
  endpoint: string,
  options: RequestOptions = {}
) {
  console.log(`reuquest-url: ${API_BASE_URL}${endpoint}`, options)
  const { data, headers = {}, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY as string,
      ...headers,
    },
    ...restOptions,
    ...(data && { body: JSON.stringify(data) }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: (endpoint: string, options?: RequestOptions) => 
    fetchApi(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint: string, data: any, options?: RequestOptions) =>
    fetchApi(endpoint, { ...options, method: 'POST', data }),
  
  put: (endpoint: string, data: any, options?: RequestOptions) =>
    fetchApi(endpoint, { ...options, method: 'PUT', data }),
  
  delete: (endpoint: string, options?: RequestOptions) =>
    fetchApi(endpoint, { ...options, method: 'DELETE' }),
};
