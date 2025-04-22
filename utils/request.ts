interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
}

interface ResponseData<T> {
    data: {
        data: T;
    };
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<ResponseData<T>> {
    const { method = 'GET', headers = {}, body } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<ResponseData<T>>;
}

// 使用示例
export async function fetchData<T>(api: string) {
    try {
        const data = await request<T>(api, {
            method: 'GET',
        });
        return data?.data?.data || []
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}
