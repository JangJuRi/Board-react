import {useEffect, useRef, useState} from "react";
import customFetch from "@/api/customFetch";
import {fileIdSetting} from "@/utils/common";

const ImageUpload = ({setSelectedFile, fileId, settingFunction}) => {
    const [preview, setPreview] = useState(null);
    const [detail, setDetail] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (fileId) {
            loadFileDetail();
        }
    }, [fileId]);

    const loadFileDetail = async () => {
        const fileData = await customFetch(`/file/detail/load/${fileId}`);
        setDetail(fileData);
    };

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
        fileIdSetting(settingFunction, '');

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // 파일 입력 필드 초기화
        }
    };

    return (
        <div className="d-flex align-items-center border p-3">
            {fileId &&
                <div className="d-flex align-items-center position-relative">
                    <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static${detail.filePath}`} alt="File"
                         className="me-3" style={{width: '200px', height: '200px', objectFit: 'cover'}}/>
                    <button type="button" className="btn-close position-absolute top-0 end-0" aria-label="Close"
                            onClick={handleRemoveImage}></button>
                    <span>{detail.originalFileName}</span>
                </div>
            }
            {!fileId &&
                <>
                    <div className="me-3 position-relative">
                        {preview && (
                            <>
                                <img id="previewImg" src={preview} alt="Preview" width="100"
                                     className="border rounded"/>
                                <button type="button"
                                        className="btn-close position-absolute top-0 start-100 translate-middle"
                                        aria-label="Close" onClick={handleRemoveImage}></button>
                            </>
                        )}
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>
                    </div>
                </>
            }
        </div>
    )
        ;
}

export default ImageUpload