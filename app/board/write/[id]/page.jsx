'use client';

import Link from "next/link";
import customFetch from "@/api/customFetch";
import {use, useEffect, useState} from "react";

export default function Page({ params }) {
    const { id } = use(params);
    const [detail, setDetail] = useState({});

    useEffect(() => {
        loadPostDetail();
    }, [id]);

    const loadPostDetail = async () => {
        const postData = await customFetch(`/post/detail/load/${id}`);
        setDetail(postData);
    };

    return (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">타이틀</label>
                                <input type="text" defaultValue={detail.title} className="form-control" id="title" placeholder="타이틀을 입력하세요"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="subtitle" className="form-label">서브타이틀</label>
                                <input type="text" defaultValue={detail.subTitle} className="form-control" id="subtitle" placeholder="서브타이틀을 입력하세요"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">내용</label>
                                <textarea defaultValue={detail.content} className="form-control" id="content" rows="5" placeholder="내용을 입력하세요"></textarea>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Link href="/" className="btn btn-secondary">목록</Link>
                                <button type="submit" className="btn btn-primary">게시글 등록</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </article>
    );
}