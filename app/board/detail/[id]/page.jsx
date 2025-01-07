'use client';

import {use, useEffect, useState} from "react";
import customFetch from "@/api/customFetch";
import Link from "next/link";

const DetailPage = ({ params }) => {
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
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="pb-4">
                            {detail.content}
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link href="/" className="btn btn-secondary">목록</Link>
                            <Link href={`/board/write/${id}`} className="btn btn-primary">수정</Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default DetailPage