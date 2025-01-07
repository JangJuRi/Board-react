export const handleChange = (setFunction) => (e) => {
    const { name, value } = e.target;
    setFunction((prev) => ({
        ...prev,
        [name]: value, // name 속성에 따라 상태 업데이트
    }));
};