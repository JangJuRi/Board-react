const customFetch = async (endpoint, options = {}) => {
    const { method = 'GET', body, headers = {} } = options;

    const fetchOptions = {
        method, // 기본값은 'GET'
        headers: {
            'Content-Type': 'application/json',
            ...headers, // 다른 헤더가 있으면 추가
        },
        ...(body && { body: JSON.stringify(body) }), // body가 있으면 포함
    };

    const response = await fetch(`${ process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, fetchOptions);

    if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
    }

    return await response.json();
};
export default customFetch;