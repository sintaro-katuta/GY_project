// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../../lib/firebase.config';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// 現時点で使わないものもあるが今後のことを考えて入れておく
import { useState } from 'react';

export default function Register() {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const doRegister = (e) => {
    e.preventDefault();
    const auth = getAuth();

    // Firebaseで用意されているユーザー登録の関数
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
      const user = userCredential.user;
      // ユーザー登録ができたかどうかをわかりやすくするためのアラート
      alert( '登録完了！' );
      console.log( user );
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>新規登録</h1>
      <form>
        <label htmlFor="email">メールアドレス</label>
        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">パスワード</label>
        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />

        <button
            onClick={(e)=>{
                  doRegister(e);
            }} 
        >
        登録        
        </button>
      </form>
    </div>
  )
}
