import { db } from '../lib/firebase.config';
import SubHeader from "../components/subheader";
import styles from "../styles/Connect.module.css"
import { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router";

export default function Connect() {
    const [postData, setPostdata]: any = useState([])
    const [clear, setClear]: any = useState([])
    const [clearFlag, setClearFlag]: any = useState(false)
    const [postUsers, setPostUsers]: any = useState([])
    const [postCurrentUser, setPostCurrentUser]: any = useState()

    const [currentUser, setCurrentUser]: any = useState([])

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
    }, [auth])

    useEffect(() => {
        (async () => {
            const posts: any = collection(db, "posts")
            const postsSnapShot: any = await getDocs(posts)
            const newPostList: any = postsSnapShot.docs.map((doc: any) => {
                const item = doc.data()
                return item
            })
            const connect: any = collection(db, "connect")
            const connectDoc: any = await doc(connect, "aoc3SSKRohVxhyg2HSpo")
            const connectSnapShot: any = await getDoc(connectDoc)
            const point: any = connectSnapShot.data().point
            const totalPost: any = newPostList
            const newPostUsers: any = newPostList.user
            let newPostCurrentUser: any
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
    }, [currentUser.uid])
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
                    <>クリアまで{clear - postData.length}！協力して投稿しよう！</>
                </>
            }
            <div>
                {currentUser.displayName} {postCurrentUser}
            </div>
            <button onClick={() => toPost()}>投稿する</button>
        </div>
    )
}