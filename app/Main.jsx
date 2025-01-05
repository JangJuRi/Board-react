'use client';

import Link from 'next/link';
import {Fragment, useEffect, useState} from "react";
import apiClient from "@/api/apiClient";

const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();

    }, []);

    const fetchData = async () => {
        const postData = await apiClient.get('/post/list/load');
        setPosts(postData.data);
    };

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {posts?.map((post) => (
                        <Fragment key={post.postId}>
                            <div className="post-preview">
                                <Link href="/board">
                                    <h2 className="post-title">{post.title}</h2>
                                    <h3 className="post-subtitle">{post.content}</h3>
                                </Link>
                                <p className="post-meta">
                                    Posted by
                                    <a href="#">{post.memberName}</a>
                                    on {post.createdDate}
                                </p>
                            </div>
                            <hr className="my-4"/>
                        </Fragment>
                    ))}
                    <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase"
                                                                        href="#">Older Posts →</a></div>
                </div>
            </div>
        </div>
    );
}

export default Main