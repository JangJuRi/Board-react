'use client';

import Link from 'next/link';
import {useEffect, useState} from "react";
import customFetch from "@/api/customFetch";
import Paging from "@/components/common/Paging";

const Main = () => {
    const [posts, setPosts] = useState([]);
    const [paging, setPaging] = useState({
        number: 0,
        size: 6
    });

    useEffect(() => {
        loadPostList();

    }, [paging.number]);

    const loadPostList = async () => {
        const postData = await customFetch('/post/list/load', {
            method: 'GET',
            query: {
                pageNumber: paging.number,
                pageSize: paging.size
            }
        });

        setPosts(postData.content);
        setPaging(postData.page);
    };

    const pageChange = async (currentPage) => {
        if (currentPage !== paging.number) {
            setPaging({
                number: currentPage,  // 페이지 번호 변경
                size: paging.size
            });
        }
    }

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {posts?.map((post) => (
                        <div className="col" key={post.postId}>
                            <div className="card h-100">
                                <Link href={`/board/detail/${post.postId}`}>
                                    <img src="#" className="card-img-top"/>
                                        <div className="card-body">
                                            <h5 className="card-title d-flex justify-content-between align-items-center">
                                                <span>{post.title}</span>
                                                <span>
                                                    <i className="bi bi-eye"></i>
                                                    <span className="ms-2">0</span>
                                                </span>
                                            </h5>
                                            <p className="card-text">{post.subTitle}</p>
                                        </div>
                                </Link>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <a href="#">
                                                <img src="#" className="me-3 rounded-circle img-fluid" style={{width: '50px', height: '50px', objectFit: 'cover'}}/>
                                                <small className="text-body-secondary">{post.memberName}</small>
                                            </a>
                                        </div>
                                        <span>
                                    <i className="bi bi-calendar-event me-2"></i>
                                    <small className="text-body-secondary">{post.formattedCreatedDate}</small>
                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-end mb-4 mt-4">
                    <Link href="/board/write/0" className="btn btn-primary text-uppercase">
                        게시글 등록
                        <i className="bi bi-plus-circle" style={{marginLeft: "5px"}}></i>
                    </Link>
                </div>
                <Paging paging={paging} pageChange={pageChange}/>
            </div>
        </div>
    );
}

export default Main