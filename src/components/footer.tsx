import Link from "next/link";
import styles from '../styles/Footer.module.css'
import { useState } from 'react'
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

export default function Footer() {
    const router = useRouter();
    const paths = decodeURI(router.asPath).substring(1).split("/");
    const roots = [""];
    for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);

    const tologin = () => {
        router.push("/account")
    }
    
    return(
        <><footer className={styles.footer}>
            <div className={styles.pic}>
                <div className={styles.pickup}>
                    <h3>PICKUP</h3>
                </div>
                <ul className={styles.ul}>
                    <li>
                        <Link href={"/memories"} className={styles.memories}>
                            みんなの思い出
                        </Link>
                    </li>
                    <li>
                        <Link href={"/album"} className={styles.album}>
                            みんなのアルバム
                        </Link>
                    </li>
                    <li>
                        <Link href={"/connect"} className={styles.connect}>
                            繋がる
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className={styles.eve}>
                    <li>
                        <Link href={"/event"} className={styles.event}>
                            特集・イベント
                        </Link>
                    </li>
                    <li>
                        <Link href={"/account"} className={styles.account}>
                            アカウント
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.login}>
                <h3>LOGIN</h3>
                <button className={styles.sinki} onClick={tologin}>新規会員登録</button><br/>
                <button className={styles.log} onClick={tologin}>ログイン</button>
            </div>
            <div className={styles.movement}>
                <h3>MOVEMENT</h3>
                <Link href={"http://localhost:8888"} className={styles.resort}>リゾートサイトへ</Link><br />
            </div>
        </footer>
        <div className={styles.bottom}>
            <h3>copyright F∞P.sns.Co.</h3>
        </div></>
    )
}