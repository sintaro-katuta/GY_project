import { db } from '../../lib/firebase.config';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from '/styles/Account.module.css'
import SubHeader from "../../components/subheader";
import { getAuth, signOut } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Info() {
    // ユーザー情報
    const [currentUser, setCurrentUser]: any = useState([])
    const [postNum, setPostNum]: any = useState(0)
    const [postLikeNum, setPostLikeNum]: any = useState(0)
    const [errorMessage, setErrorMessage]: any = useState("")
    const auth = getAuth()
    const router = useRouter()

    useEffect(() => {
        // ログイン状態をウォッチ
        let unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                // ユーザ情報を格納する
                setCurrentUser(user)
            } else {
                router.push("/account")
            }
            unsubscribe()
        })
    }, [auth])

    useEffect(() => {
        (async () => {
            const posts = collection(db, "posts")
            const q = await query(posts, where("user", "==", `${currentUser.displayName}`))
            const postsSnapShot = await getDocs(q)
            const newPostData = await postsSnapShot.docs.map((doc: any) => {
                if (doc.exists()) {
                    return doc.data()
                }
            })
            let newPostNum = newPostData.length
            let newPostLikeNum = 0
            for (let i in newPostData) {
                newPostLikeNum += newPostData[i].liked.length
            }
            setPostNum(newPostNum)
            setPostLikeNum(newPostLikeNum)
        })()
    }, [currentUser])

    const logOut = () => {
        signOut(auth)
            .then(() => {
                router.push("/account")
            })
            .catch((err: any) => {
                setErrorMessage(err.message)
            })
    }

    return (
        <>
            <SubHeader />
            <div className={styles.infoFlame}>
                <p className={styles.error}>{errorMessage}</p>
                <h2>あなたの情報</h2>
                <div className={styles.infoDiv}>
                    <h3 className={styles.infoName}>名前<span className={styles.infoValue}>{currentUser.displayName}</span></h3>
                </div>
                <div className={styles.infoDiv}>
                    <h3 className={styles.infoName}>投稿　<span className={styles.infoValue}>{postNum}</span></h3>
                </div>
                <div className={styles.infoDiv}>
                    <h3 className={styles.infoName}>いいね<span className={styles.infoValue}>{postLikeNum}</span></h3>
                </div>
                <p className={styles.logout} onClick={() => logOut()}>ログアウト</p>
            </div>
        </>
    )
}