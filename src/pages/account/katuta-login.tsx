// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../../lib/firebase.config';

import { getAuth, signOut, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
// 後ほどパスワード再設定画面へのリンクを設置するために入れておく
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ユーザーがログインボタンを押したときにdoLogin関数が実行される
  const doLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();

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
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((response) => {
      console.log(response.user);
    });
  };

  const doFacebookLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then((response) => {
      console.log(response.user);
    });
  };



  return (
    <div>
      <h1>ログイン</h1>
      <form>
        <label htmlFor="email">メールアドレス</label>
        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">パスワード</label>
        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={(e) => doLogin(e)}>ログイン</button>

        <button onClick={(e) => doGoogleLogin(e)}>Googleログイン</button>
        <button onClick={(e) => doFacebookLogin(e)}>Facebookログイン</button>

      </form>
    </div>
  )
}
