import { db } from '../lib/firebase.config';
import SubHeader from "../components/subheader";
import styles from "../styles/Connect.module.css"
import { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router";

export default function Connect() {
    const [postData, setPostdata] = useState([])
    const [clear, setClear] = useState([])
    const [clearFlag, setClearFlag] = useState(false)
    const [postUsers, setPostUsers] = useState([])
    const [postCurrentUser, setPostCurrentUser] = useState()

    const [currentUser, setCurrentUser] = useState([])
    
    const router = useRouter();
    const toPost = () => {
        router.push("/post")
    }

    // firebase関連
    const auth = getAuth()

    useEffect(() => {
        // ログイン状態をウォッチ
        let unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                // ユーザ情報を格納する
                setCurrentUser(user)
            }
            unsubscribe()
        })
    }, [])

    useEffect(() => {
        (async () => {
            const posts = collection(db, "posts")
            const postsSnapShot = await getDocs(posts)
            const newPostList = postsSnapShot.docs.map((doc: any) => {
                const item = doc.data()
                return item
            })
            const connect = collection(db, "connect")
            const connectDoc = await doc(connect, "aoc3SSKRohVxhyg2HSpo")
            const connectSnapShot = await getDoc(connectDoc)
            const point = connectSnapShot.data().point
            const totalPost = newPostList
            const newPostUsers = newPostList.user
            let newPostCurrentUser
            if (point - totalPost < 0) {
                setClearFlag(true)
            } else {
                setClearFlag(false)
            }
            for (let i = 0; i < newPostList.length; i++) {
                if (newPostList[i].user == currentUser.uid) {
                    newPostCurrentUser = i + 1
                }
            }
            setPostdata(totalPost)
            setClear(point)
            setPostUsers(newPostUsers)
            setPostCurrentUser(newPostCurrentUser)
        })()
    }, [setCurrentUser])
    return (
        <div className={styles.container}>
            <SubHeader />
            <p>みんなの投稿でIRで使えるスペシャルなお宝をゲットしよう！</p>
            <p>チャレンジ期間</p>
            <p>全体の投稿数 {postData.length}</p>
            <p>クリア投稿数 {clear}</p>
            {clearFlag
                ?
                <>
                    クリア！
                </>
                :
                <>
                    クリアまで{clear - postData.length}！協力して投稿しよう！
                </>
            }
            <div>
                {currentUser.displayName} {postCurrentUser}
            </div>
            <button onClick={() => toPost()}>投稿する</button>
        </div>
    )
}