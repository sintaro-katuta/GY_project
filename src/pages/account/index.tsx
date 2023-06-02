// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../../lib/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { useState, useEffect } from 'react';
import Link from "next/link";


export default function Account() {
    // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tab, setTab] = useState(true);
    const auth = getAuth();

    const changeTab = (e) => {
        if (e.target.id == 'registerTab') {
            setTab(false)
        } else if (e.target.id == 'loginTab') {
            setTab(true)
        }
    }

    // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
    const doRegister = (e) => {
        e.preventDefault();

        // Firebaseで用意されているユーザー登録の関数
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
                const user = userCredential.user;
                // ユーザー登録ができたかどうかをわかりやすくするためのアラート
                alert('登録完了！');
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // ユーザーがログインボタンを押したときにdoLogin関数が実行される
    const doLogin = (e) => {
        e.preventDefault();

        // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // ログインができたかどうかをわかりやすくするためのアラート
                alert('ログインOK!');
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const doGoogleLogin = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then((response) => {
            console.log(response.user);
        });
    };

    const doFacebookLogin = async (e) => {
        e.preventDefault();

        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider).then((response) => {
            console.log(response.user);
        });
    };

    return (
        <div>
            <h1>アカウント</h1>
            <h2 id="loginTab" onClick={(e) => changeTab(e)}>ログイン</h2>
            <h2 id="registerTab" onClick={(e) => changeTab(e)}>会員登録</h2>
            {tab ?
                <div id="login">
                    <form>
                        <label htmlFor="email">メールアドレス</label>
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">パスワード</label>
                        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />

                        <button onClick={(e) => doLogin(e)}>ログイン</button>
                        <br />
                        <button onClick={(e) => doGoogleLogin(e)}>Googleログイン</button>
                        <button onClick={(e) => doFacebookLogin(e)}>Facebookログイン</button>

                    </form>
                </div>
                :
                <div id="register">
                    <form>
                        <label htmlFor="email">メールアドレス</label>
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">パスワード</label>
                        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />

                        <button
                            onClick={(e) => {
                                doRegister(e);
                            }}
                        >
                            登録
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}