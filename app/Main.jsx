'use client';

import Link from 'next/link';
import {Fragment, useEffect, useState} from "react";
import customFetch from "@/api/customFetch";

const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPostList();

    }, []);

    const loadPostList = async () => {
        const postData = await customFetch('/post/list/load', {
            method: 'GET'
        });

        setPosts(postData);
    };

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {posts?.map((post) => (
                        <Fragment key={post.postId}>
                            <div className="post-preview">
                                <Link href={`/board/detail/${post.postId}`}>
                                    <h2 className="post-title">{post.title}</h2>
                                    <h3 className="post-subtitle">{post.subTitle}</h3>
                                </Link>
                                <p className="post-meta">
                                    Posted by
                                    <a href="#">{post.memberName}</a>
                                    on {post.formattedCreatedDate}
                                </p>
                            </div>
                            <hr className="my-4"/>
                        </Fragment>
                    ))}
                    <div className="d-flex justify-content-end mb-4">
                        <Link href="/board/write/0" className="btn btn-primary text-uppercase">
                            게시글 등록
                            <i className="bi bi-plus-circle" style={{marginLeft: "5px"}}></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main