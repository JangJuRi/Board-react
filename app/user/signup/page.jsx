'use client';

import useInput from "@/hooks/useInput";
import customFetch from "@/api/customFetch";
import {useState} from "react";
import {useRouter} from "next/navigation";

const Signup = () => {
    const router = useRouter();

    const accountId = useInput('', 'id');
    const name = useInput('');
    const password = useInput('');

    const [accountIdDuplicate, setAccountIdDuplicate] = useState(false);
    const [confirmPassword,setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const checkAccountIdDuplicate = async () => {
        const isDuplicate = await customFetch(`/member/account-id/duplicate/load/${accountId.value}`);

        if (!isDuplicate) {
            alert("사용가능한 아이디입니다.");
        }

        setAccountIdDuplicate(isDuplicate);
    }

    const signup = async () => {
        if (!await isValidate()) {
            return false;
        }

        await customFetch('/member/signup', {
            method: 'POST',
            body: {
                accountId: accountId.value,
                name: name.value,
                password: password.value
            }
        })

        await router.push('/');
    }

    const isValidate = async () => {
        if (!accountId.value || !name.value || !password.value || !confirmPassword) {
            alert("필수값을 입력해주세요");
            return false;
        }

        if (accountIdDuplicate) {
            alert("중복된 아이디입니다.");
            return false;
        }

        if (passwordError) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }

        return true;
    }

    const handlePassword = (e)=> {
        const {value} = {...e.target}
        setPasswordError(password.value !== value) //같으면 false 다르면 true
        setConfirmPassword(value)
    }

    return (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        <h2 className="text-center mb-4">회원가입</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">아이디 *</label>
                                <div className="input-group">
                                    <input type="text" {...accountId} className="form-control" placeholder="아이디를 입력하세요" required/>
                                    <button type="button" onClick={checkAccountIdDuplicate} className="btn btn-sm btn-secondary">중복확인</button>
                                </div>
                                { accountIdDuplicate && <div className="text-danger mt-1 fs-6">중복되는 아이디입니다.</div> }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">이름 *</label>
                                <input type="text" {...name} className="form-control" placeholder="이름을 입력하세요" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">비밀번호 *</label>
                                <input type="password" {...password} className="form-control" placeholder="비밀번호를 입력하세요" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">비밀번호 확인 *</label>
                                <input type="password" value ={confirmPassword} onChange={handlePassword} className="form-control" placeholder="비밀번호를 다시 입력하세요" required/>
                            </div>
                            { passwordError && <div className="text-danger mt-1 fs-6">비밀번호가 일치하지 않습니다.</div> }
                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={signup}>가입</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </article>

    );
}

export default Signup