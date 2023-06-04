// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../../lib/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { useState, useEffect } from 'react';
import Link from "next/link";
import { collection, doc, setDoc, addDoc, serverTimestamp, getDocs, updateDoc } from "firebase/firestore";


export default function Account() {
    // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
    const [name, setName] = useState('')
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
    const doRegister = async (e) => {
        e.preventDefault();
        // Firebaseで用意されているユーザー登録の関数
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
                const user = userCredential.user;
                if (user == null) {
                    alert("アカウント作成に失敗しました")
                }
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
                alert('登録完了！');
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
    const doLogin = (e) => {
        e.preventDefault();

        // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // ログインができたかどうかをわかりやすくするためのアラート
                alert('ログインOK!');
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

    const doGoogleLogin = async (e) => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then((response) => {
            usersCheck(response.user)
        });
    };

    const doFacebookLogin = async (e) => {
        e.preventDefault();

        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider).then(async (response) => {
            usersCheck(response.user)
        });
    };

    const usersCheck = async (user) => {
        const ref = collection(db, "users")
        const snapShot = await getDocs(ref)
        let flag = false
        const list = snapShot.docs.map((doc) => {
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
        }
    }

    return (
        <div>
            <h1>アカウント</h1>
            <h2 id="loginTab" onClick={(e) => changeTab(e)}>ログイン</h2>
            <h2 id="registerTab" onClick={(e) => changeTab(e)}>会員登録</h2>
            {tab ?
                <div id="login">
                    <form>
                        <label htmlFor="login-email">メールアドレス</label>
                        <input type="text" id="login-email" autoComplete="on" onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="login-password">パスワード</label>
                        <input type="password" id="login-password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />

                        <button onClick={(e) => doLogin(e)}>ログイン</button>
                        <br />
                        <button onClick={(e) => doGoogleLogin(e)}>Googleログイン</button>
                        <button onClick={(e) => doFacebookLogin(e)}>Facebookログイン</button>

                    </form>
                </div>
                :
                <div id="register">
                    <form>
                        <label htmlFor="name">名前</label>
                        <input type="text" id="name" autoComplete="on" onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="register-email">メールアドレス</label>
                        <input type="text" id="register-email" autoComplete="on" onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="register-password">パスワード</label>
                        <input type="password" id="register-password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />

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