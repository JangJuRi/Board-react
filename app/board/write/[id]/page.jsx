'use client';

import Link from "next/link";
import customFetch from "@/api/customFetch";
import {use, useEffect, useState} from "react";
import {handleChange} from "@/utils/common";
import { useRouter } from 'next/navigation';
import ImageInput from "@/components/common/ImageInput";

const Page = ({ params }) => {
    const router = useRouter();
    const { id } = use(params);
    const [detail, setDetail] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        loadPostDetail();
    }, [id]);

    const loadPostDetail = async () => {
        const postData = await customFetch(`/post/detail/load/${id}`);
        setDetail(postData);
    };

    const savePost = async () => {
        const formData = new FormData();
        formData.append("imageFile", selectedFile);
        formData.append("postId", id === '0' ? '' : id);
        formData.append("title", detail.title);
        formData.append("subTitle", detail.subTitle);
        formData.append("content", detail.content);
        formData.append("fileId", detail.fileId);

        await customFetch('/post/save', {
            method: 'POST',
            body: formData
        })

        await router.push('/');
    }

    return (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">타이틀</label>
                                <input type="text" value={detail.title || ''} className="form-control" id="title"
                                       name="title" placeholder="타이틀을 입력하세요"
                                       onChange={handleChange(setDetail)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="subtitle" className="form-label">서브타이틀</label>
                                <input type="text" value={detail.subTitle || ''} className="form-control" id="subTitle"
                                       name="subTitle" placeholder="서브타이틀을 입력하세요"
                                       onChange={handleChange(setDetail)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">내용</label>
                                <textarea value={detail.content || ''} className="form-control" id="content"
                                          name="content" rows="5" placeholder="내용을 입력하세요"
                                          onChange={handleChange(setDetail)}></textarea>
                            </div>

                            <div className="mb-3">
                                <label>이미지</label>
                                <ImageInput setSelectedFile={setSelectedFile} fileId={detail.fileId} settingFunction={setDetail}/>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Link href="/" className="btn btn-secondary">목록</Link>
                                <button type="button" onClick={savePost} className="btn btn-primary">저장</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Page