// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, setDoc, getDoc, getDocs, addDoc, serverTimestamp, deleteDoc, updateDoc, deleteField, FieldValue } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect, memo } from 'react'
import { useRouter } from "next/router";
import NextImage from 'next/image';


export default function Memories() {
    const [postList, setPostList] = useState([])
    const [imageList, setImageList] = useState([])
    const [likeList, setLikeList] = useState([])
    const [likevisible, setLikevisible] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)

    const auth = getAuth()
    const router = useRouter()
    // ログイン状態をウォッチ
    let unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            // ユーザ情報を格納する
            setCurrentUser(user)
        } else {
            router.push("/account")
        }
        unsubscribe()
    })

    // いいねボタンを押したときの処理
    const likeButton = (id, e) => {
        let likedUser = collection(db, 'likes')
        let likedUserDoc = doc(likedUser, id)
        let likedUsers: any = {}
        let newLikeList = [...likeList]
        let newLikevisible = [...likevisible]
        let likedUserSnapshot = getDoc(likedUserDoc)
        likedUserSnapshot.then((value) => {
            if (value.exists()) {
                const item = value.data().user
                for (let i = 0; i < item.length; i++) {
                    // データベースに自分のuidがあった
                    if (item[i] == currentUser.uid) {
                        newLikevisible[e] = false   // いいねできるようにする
                        deleteDoc(likedUserDoc)
                        newLikeList[e] = newLikeList[e] - 1
                        // データベースに自分のuidがなかった
                    } else {
                        likedUsers = currentUser.uid
                        const userData = {
                            user: [likedUsers]
                        }
                        newLikevisible[e] = true   // いいねできないようにする
                        setDoc(likedUserDoc, userData)
                        newLikeList[e] = newLikeList[e] + 1
                    }
                }
            } else {
                likedUsers = currentUser.uid

                const userData = {
                    user: [likedUsers]
                }
                newLikevisible[e] = true   // いいねできないようにする
                setDoc(likedUserDoc, userData)
                newLikeList[e] = newLikeList[e] + 1
            }
            setLikeList(newLikeList);
            setLikevisible(newLikevisible);
        })
    }

    useEffect(() => {
        (async () => {
            console.log("database")
            // データベースから投稿取得
            const posts = collection(db, "posts")
            const postsSnapShot = await getDocs(posts)
            const newPostList = postsSnapShot.docs.map((doc: any) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            // データベースから投稿した画像を取得
            const posts_images = collection(db, "posts_images")
            const postsImagesSnapShot = await getDocs(posts_images)
            const newPostsImagesList = postsImagesSnapShot.docs.map((doc: any) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            // データベースから投稿したユーザーを取得
            const users = collection(db, "users")
            let newUser: any[] = []

            for (let i = 0; i < newPostList.length; i++) {
                const usersDoc = doc(users, newPostList[i].user)
                const usersSnapshot = getDoc(usersDoc)
                await usersSnapshot.then((value: any) => {
                    if (value.exists()) {
                        const item = value.data()
                        newUser.push(item)
                    }
                })
            }
            // データベースからいいねを取得
            const likedUser = collection(db, 'likes')
            let newLikeList: any[] = []
            let newLikevisible: any[] = []
            for (let i = 0; i < newPostList.length; i++) {
                const likedUserDoc = doc(likedUser, newPostList[i].id)
                const likedUserSnapshot = getDoc(likedUserDoc)

                await likedUserSnapshot.then((value: any) => {
                    if (value.exists()) {
                        for (let j = 0; j < value.data().user.length; j++) {
                            if (currentUser) {
                                if (value.data().user[j] === currentUser.uid) {
                                    newLikevisible.push(true)
                                } else {
                                    newLikevisible.push(false)
                                }
                            }
                        }
                        newLikeList.push(value.data().user.length)
                    } else {
                        newLikevisible.push(false)
                        newLikeList.push(0)
                    }
                })
            }
            setPostList(newPostList)
            setImageList(newPostsImagesList)
            setUsers(newUser)
            setLikeList(newLikeList)
            setLikevisible(newLikevisible)
        })()
    }, [currentUser])


    return (
        <div>
            <Header />
            <h1>みんなの思い出</h1>
            {postList.map((post, i) => {
                return (
                    <div key={i}>
                        <p>------------------------------</p>
                        <p>{users[i].name}</p>
                        <p>{post.comment}</p>
                        {imageList.map((image, j) => {
                            if (post.id === image.post_id) {
                                return (
                                    <NextImage key={j} alt={`画像${i}`} src={image.image} width={120} height={120} />
                                )
                            }
                        })}
                        {likevisible[i] ?
                            <div>
                                <button value={i} onClick={() => likeButton(post.id, i)}>いいね済み</button>
                                {likeList[i]}
                            </div>
                            :
                            <div>
                                <button value={i} onClick={() => likeButton(post.id, i)}>いいね</button>
                                {likeList[i]}
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}