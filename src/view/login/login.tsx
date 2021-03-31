import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import  './login.scss'


const Login: React.FC<void> = (props) => {
    const history = useHistory();
    const [params, setParams] = useState({
        loginType: true,
        loading: false,
        loginForm: {
            username: '',
            password: ''
        },
        registerForm: {
            username: '',
            email: '',
            password: ''
        }
    });
    const [isUsesRight, setIsUsesRight] = useState<boolean>(false);

    const toggleClass = ()=>{
        setIsUsesRight(!isUsesRight)
    }
    const login = (event:any)=>{
        event.preventDefault()
        sessionStorage.setItem('token', '1')
        history.push('/homePage')

    }
    return (
        <div className={'login-background'} >
            <div className={`${'card-box'} ${isUsesRight?'right-panel-active':''}`}>
                <div className={`${'move-container'} ${"sign-in-container"}`}>
                    <form className={"from-box"}>
                        <h1>登录</h1>
                        <input type="text" placeholder="账号" />
                        <input type="text" placeholder="密码" />
                        <span>忘记密码</span>
                        <button type="submit" className="bg-primary" onClick={login}>登录</button>
                    </form>
                </div>
                <div className={`${'move-container'} ${"sign-up-container"}`}>
                    <form className={"from-box"}>
                        <h1>注册</h1>
                        <input type="text" placeholder="账号" />
                        <input type="text" placeholder="邮箱" />
                        <input type="text" placeholder="密码" />
                        <button type="submit" className="bg-primary">注册</button>
                    </form>

                </div>
                <div className={'overlay-container'}>
                    <div className={"overlay"}>
                        <div className={'left-box'}>
                            <h1>欢迎回来！</h1>
                            <span>请您先登录的个人信息，进行操作。</span>
                            <button onClick={toggleClass}>登录</button>
                        </div>
                        <div className={'right-box'}>
                            <h1>注册新的账号</h1>
                            <span>输入您的个人信息注册账号。</span>
                            <button onClick={toggleClass}>注册</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Login


