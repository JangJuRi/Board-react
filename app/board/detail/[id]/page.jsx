'use client';

import {use, useEffect, useState} from "react";
import customFetch from "@/api/customFetch";
import Link from "next/link";
import {useRouter} from "next/navigation";

const DetailPage = ({ params }) => {
    const router = useRouter();
    const { id } = use(params);
    const [detail, setDetail] = useState({});

    useEffect(() => {
        loadPostDetail();
    }, [id]);

    const loadPostDetail = async () => {
        const postData = await customFetch(`/post/detail/load/${id}`);
        setDetail(postData);
    };

    const removePost = async () => {
        await customFetch('/post/remove', {
            method: 'POST',
            body: {
                postId: id
            }
        })

        await router.push('/');
    }

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
                            <div>
                                {id !== '0' && <button type="button" onClick={removePost} className="btn btn-danger me-2">삭제</button>}
                                <Link href={`/board/write/${id}`} className="btn btn-primary">수정</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default DetailPage