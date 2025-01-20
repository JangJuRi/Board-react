import {useRef, useState} from "react";

const ImageUpload = ({setSelectedFile}) => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null); // 부모 상태 초기화
        setPreview(null); // 미리보기 초기화

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // 파일 입력 필드 초기화
        }
    };

    return (
        <div className="d-flex align-items-center border p-3">
            <div className="me-3 position-relative">
                {preview && (
                    <>
                        <img id="previewImg" src={preview} alt="Preview" width="100" className="border rounded"/>
                        <button type="button" className="btn-close position-absolute top-0 start-100 translate-middle"
                                aria-label="Close" onClick={handleRemoveImage}></button>
                    </>
                )}
            </div>
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>
            </div>
        </div>
    )
        ;
}

export default ImageUpload