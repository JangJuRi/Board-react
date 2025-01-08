import {Fragment} from "react";
import Link from "next/link";

const Nav = () => {
    return (
        <Fragment>

            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link href="/" className="navbar-brand">
                        jrjang Study
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item">
                                <a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">이름</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">
                                    <i className="bi bi-box-arrow-right btn-sm me-2"></i>로그아웃
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>로그인
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link href="/user/signup" className="nav-link px-lg-3 py-3 py-lg-4">
                                    <i className="bi bi-person-square me-2"></i>회원가입
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="masthead" style={{backgroundImage: 'url(/assets/img/home-bg.jpg)'}}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>JPA & React</h1>
                                <span className="subheading">스터디용 게시판입니다</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
);
}

export default Nav