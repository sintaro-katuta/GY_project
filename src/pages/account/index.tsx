// Firebaseの初期化を行うためfirebaseAppをインポート
import { db } from '../../lib/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from "next/link";
import { collection, doc, setDoc, addDoc, serverTimestamp, getDocs, updateDoc } from "firebase/firestore";
import styles from '/styles/Account.module.css'
import Image from 'next/image';
import React, { useRef } from 'react';

export default function Account() {
    // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tab, setTab] = useState(true);
    const auth = getAuth();
    const [changed] = useState(false);
    const router = useRouter();
    let login: any
    let sinki: any
    if (typeof window === 'object') {
        login = document.querySelector("#loginTab")
        sinki = document.querySelector("#registerTab")
    }

    const changeTab = (e: any) => {
        if (e.target.id == 'registerTab') {
            setTab(false)
            if (changed === false) {
                if (login && sinki) {
                    login.style.color = "#A5A5A5";
                    sinki.style.color = "#222222";
                }
            }
        } else if (e.target.id == 'loginTab') {
            setTab(true)
            if (changed === false) {
                if (login && sinki) {
                    login.style.color = "#222222";
                    sinki.style.color = "";
                }
            }
        }
    }

    // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
    const doRegister = async (e: any) => {
        e.preventDefault();
        // Firebaseで用意されているユーザー登録の関数
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
                const user: any = userCredential.user;
                if (user == null) {
                    alert("アカウント作成に失敗しました")
                } else {
                    const users = collection(db, "users")
                    const usersData = {
                        id: user.id,
                        name: name,
                        email: email,
                        updated_at: serverTimestamp(),
                        created_at: serverTimestamp(),
                    }
                    await addDoc(users, usersData)
                    updateProfile(user, {
                        displayName: name,
                    })
                    // ユーザー登録ができたかどうかをわかりやすくするためのアラート
                    router.push('/');
                }
            })
            .catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/weak-password') {
                    alert("パスワードは6 文字以上の文字列を指定する必要があります")
                } else if (error.code === 'auth/email-already-in-use') {
                    alert("既にメールアドレスは使用されています")
                } else if (error.code === 'auth/invalid-email') {
                    alert("メールアドレスの形式が正しくありません")
                } else {
                    alert(`不明なエラー エラーコード:${error.code}`)
                }
            });
    }

    // ユーザーがログインボタンを押したときにdoLogin関数が実行される
    const doLogin = (e: any) => {
        e.preventDefault();

        // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // ログインができたかどうかをわかりやすくするためのアラート
                router.push('/');
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    // メールアドレスの形式がおかしい
                    alert("メールのアドレスを確認してください")
                } else if (error.code === 'auth/user-disabled') {
                    // ユーザが無効になっている
                    alert("ユーザが無効です")
                } else if (error.code === 'auth/user-not-found') {
                    // ユーザが存在しない
                    alert("ユーザが存在しません")
                } else if (error.code === 'auth/wrong-password') {
                    // パスワードが間違っている
                    alert("パスワードが違います")
                } else if (error.code === 'auth/too-many-requests') {
                    // 何度もパスワードを間違えた
                    alert("パスワードを複数回違っています")
                } else {
                    // その他
                    alert(`不明なエラー エラーコード:${error.code}`)
                }
            })
    };

    const doGoogleLogin = async (e: any) => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then((response) => {
            usersCheck(response.user)
        });
    };

    const doFacebookLogin = async (e: any) => {
        e.preventDefault();

        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider).then(async (response) => {
            usersCheck(response.user)
        });
    };

    const usersCheck = async (user: any) => {
        const ref = collection(db, "users")
        const snapShot = await getDocs(ref)
        let flag = false
        const list = snapShot.docs.map((doc: any) => {
            const item = doc.data()
            item.id = doc.id
            return item
        })
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === user.uid) {
                flag = true
                break
            } else {
                flag = false
            }
        }
        if (flag === false) {
            const users = collection(db, "users");
            const userData = {
                name: user.displayName,
                email: user.email,
                updated_at: serverTimestamp(),
                created_at: serverTimestamp()
            }
            const docref = doc(users, user.uid)
            await setDoc(docref, userData)

        } else {
            const users = collection(db, "users");
            const userData = {
                updated_at: serverTimestamp(),
            }
            const docref = doc(users, user.uid)
            await updateDoc(docref, userData)
            router.push('/');
        }
    }

    return (
        <div className={styles.flame}>
            <Image className={styles.topleft}
                src={"/image/Group 86.png"}
                width={310} height={320} alt='topleft'
            />

            <Image className={styles.bottomright}
                src={"/image/Group 87.png"}
                width={310} height={320} alt='bottomright'
            />
            <div className={styles.flame1}>
                <h2 id="loginInfo" className={styles.memorie}>会員登録してみんなに思い出を共有しよう</h2>
                <Image className={styles.foop}
                    src={"/image/Group 89.svg"}
                    width={317} height={360} alt='foop'
                />
                <div className={styles.logaka}>
                    <h2 id="loginTab" onClick={(e) => changeTab(e)} className={styles.loginTab}>ログイン</h2>
                    <div className={styles.line}></div>
                    <h2 id="registerTab" onClick={(e) => changeTab(e)} className={styles.sinki}>新規会員登録</h2>
                </div>
                {tab ?
                    <div id="login" className={styles.log}>
                        <form className={styles.form}>
                            <label htmlFor="login-email" className={styles.mail}>メール</label><br></br>
                            <input type="text" id="login-email" className={styles.email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} /><br></br>
                            <div className={styles.text_underline}></div>

                            <label htmlFor="login-password" className={styles.pass}>パスワード</label><br></br>
                            <input type="password" id="login-password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} className={styles.password} /><br></br>
                            <div className={styles.text_underline}></div>
                            <button onClick={(e) => doLogin(e)} className={styles.buttonlog}>ログインする</button>
                            <br />
                            <Link href={"/post"} onClick={(e) => doGoogleLogin(e)} className={styles.google}>Googleでログインする</Link>< br />
                            <Link href={"/post"} onClick={(e) => doFacebookLogin(e)} className={styles.facebook}>Facebookでログインする</Link>
                        </form>
                    </div>
                    :
                    <div id="register" className={styles.log1}>
                        <form>
                            <label htmlFor="register-email" className={styles.mail}>メール</label><br></br>
                            <input type="text" id="register-email" autoComplete="on" onChange={(e) => setEmail(e.target.value)} className={styles.email1} /><br></br>
                            <div className={styles.text_underline1}></div>

                            <label htmlFor="register-password" className={styles.pass}>パスワード</label><br></br>
                            <input type="password" id="register-password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} className={styles.password1} /><br></br>
                            <div className={styles.text_underline1}></div>

                            <label htmlFor="name" className={styles.name}>名前</label><br></br>
                            <input type="text" id="name" autoComplete="on" onChange={(e) => setName(e.target.value)} className={styles.namae} />
                            <div className={styles.text_underline1}></div>

                            <button onClick={(e: any) => doRegister(e)} className={styles.buttonlog1}>
                                新規会員登録
                            </button>
                            <Link href={""} onClick={(e: any) => doGoogleLogin(e)} className={styles.google}>Googleでログインする</Link>
                            <Link href={""} onClick={(e: any) => doFacebookLogin(e)} className={styles.facebook}>Facebookでログインする</Link>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}