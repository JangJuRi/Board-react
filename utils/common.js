export const handleChange = (setFunction) => (e) => {
    const { name, value } = e.target;
    setFunction((prev) => ({
        ...prev,
        [name]: value, // name 속성에 따라 상태 업데이트
    }));
};

export const fileIdSetting = (setFunction, value) => {
    setFunction(prev => ({
        ...prev,
        fileId: value // fileId만 업데이트
    }));
};

export const handleEnglishAndNumberFormatter = (setFunction) => (e) => {
    const value = e.target.value;
    // 영어 대소문자와 숫자만 허용
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(value)) {
        setFunction(value);
    }
};