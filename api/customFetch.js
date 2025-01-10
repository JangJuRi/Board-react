const customFetch = async (endpoint, options = {}) => {
    const { method = 'GET', body, headers = {}, query = {} } = options;

    // query 객체가 있으면 URL에 쿼리 문자열을 추가
    const queryString = new URLSearchParams(query).toString();
    const fullUrl = queryString ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}?${queryString}` : `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

    const fetchOptions = {
        method, // 기본값은 'GET'
        headers: {
            'Content-Type': 'application/json',
            ...headers, // 다른 헤더가 있으면 추가
        },
        ...(body && { body: JSON.stringify(body) }), // body가 있으면 포함
    };


    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
    }

    // 응답 본문이 비어있지 않으면 JSON 파싱
    const textResponse = await response.text(); // 응답을 텍스트로 읽음
    if (!textResponse) {
        return {}; // 빈 응답일 경우 빈 객체 반환
    }

    try {
        const parsedResponse = JSON.parse(textResponse);

        // 파싱된 결과가 객체인 경우만 반환
        if (parsedResponse && typeof parsedResponse === 'object' && !Array.isArray(parsedResponse)) {
            return parsedResponse;
        }
    } catch (e) {
        // JSON 파싱 오류가 나면 그대로 텍스트 반환
    }

    return textResponse;
};
export default customFetch;