// Firebaseの初期化を行うためfirebaseAppをインポート
import { db } from '../../lib/firebase.config';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect, useRef, createRef, forwardRef } from 'react'
import { useRouter } from "next/router";
import NextImage from 'next/image';
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ja from 'dayjs/locale/ja';


export default function Memories() {
    const [postList, setPostList] = useState([])
    const [imageList, setImageList] = useState([])
    const [likeList, setLikeList] = useState([])
    const [likevisible, setLikevisible] = useState([])
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)

    const auth = getAuth()
    const router = useRouter()
    const ref = useRef([])

    dayjs.locale(ja);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

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
    }, [])


    // いいねボタンを押したときの処理
    const addLiked = (post_id: string, e: any) => {
        // const likes = collection(db, 'likes')
        // const likedDoc = doc(likes, post_id)
        // let newPostLiked = likeList[e]
        // newPostLiked.push(currentUser.uid)
        // const likedData = {
        //     user: newPostLiked
        // }
        // setDoc(likedDoc, likedData)

        // const newLikeList = [...likeList]
        // newLikeList[e] = newPostLiked
        // setLikeList(newLikeList)

        // const newLikevisible = [...likevisible]
        // newLikevisible[e] = true
        // setLikevisible(newLikevisible)
    }
    const deleteLiked = (post_id: string, e: any) => {
        // const likes = collection(db, 'likes')
        // const likedDoc = doc(likes, post_id)
        // let newPostLiked = likeList[e]
        // const idx = newPostLiked.indexOf(currentUser.uid)
        // if (idx >= 0) {
        //     newPostLiked.splice(idx, 1)
        // }
        // const likedData = {
        //     user: newPostLiked
        // }
        // setDoc(likedDoc, likedData)

        // const newLikeList = [...likeList]
        // newLikeList[e] = newPostLiked
        // setLikeList(newLikeList)

        // const newLikevisible = [...likevisible]
        // newLikevisible[e] = false
        // setLikevisible(newLikevisible)
    }

    const commentSubmit = (id: string) => {
        // router.push(`/memories/${id}`)
    }

    const videoPlay = (e: number) => {
        ref[e].current.play()
    }


    useEffect(() => {
        (async () => {
            // // データベースから投稿取得
            // const posts = collection(db, "posts")
            // const postsSnapShot = await getDocs(posts)
            // const newPostList = postsSnapShot.docs.map((doc: any) => {
            //     const item = doc.data()
            //     item.id = doc.id
            //     return item
            // })
            // // データベースから投稿した画像を取得
            // const posts_images = collection(db, "posts_images")
            // let newPostsImagesList: any = []
            // for (let i = 0; i < newPostList.length; i++) {
            //     const postsImagesDoc = await doc(posts_images, newPostList[i].id)
            //     const postsImagesSnapShot = getDoc(postsImagesDoc)
            //     await postsImagesSnapShot.then((value: any) => {
            //         if (value.exists()) {
            //             newPostsImagesList.push(value.data().image)
            //         }
            //     })
            // }

            // // データベースから投稿したユーザーを取得
            // const users = collection(db, "users")
            // let newUser: any[] = []

            // for (let i = 0; i < newPostList.length; i++) {
            //     const usersDoc = doc(users, newPostList[i].user)
            //     const usersSnapshot = getDoc(usersDoc)
            //     await usersSnapshot.then((value: any) => {
            //         if (value.exists()) {
            //             const item = value.data()
            //             newUser.push(item)
            //         }
            //     })
            // }
            // // データベースからいいねを取得
            // const likedUser = collection(db, 'likes')
            // let newLikeList: any[] = []
            // let newLikevisible: any[] = likevisible
            // for (let i = 0; i < newPostList.length; i++) {
            //     const likedUserDoc = doc(likedUser, newPostList[i].id)
            //     const likedUserSnapshot = getDoc(likedUserDoc)

            //     await likedUserSnapshot.then((value: any) => {
            //         if (value.exists()) {
            //             for (let j = 0; j < value.data().user.length; j++) {
            //                 if (currentUser) {
            //                     if (value.data().user[j] === currentUser.uid) {
            //                         newLikevisible[i] = true
            //                     } else {
            //                         newLikevisible[i] = false
            //                     }
            //                 }
            //             }
            //             newLikeList.push(value.data().user)
            //         } else {
            //             const likedUserData = {
            //                 user: []
            //             }
            //             setDoc(likedUserDoc, likedUserData)
            //             newLikevisible[i] = false
            //             newLikeList.push(likedUserData)
            //         }
            //     })
            // }
            // const postsComments = collection(db, 'posts_comments')
            // let newComments: any = []
            // for (let i = 0; i < newPostList.length; i++) {
            //     const postsCommentsDoc = doc(postsComments, newPostList[i].id)
            //     const postsCommentsSnapshot = getDoc(postsCommentsDoc)
            //     await postsCommentsSnapshot.then((value: any) => {
            //         if (value.exists()) {
            //             const item = value.data()
            //             console.log("item.length", Object.keys(item).length)
            //             newComments[i] = Object.keys(item).length
            //         }
            //     })
            // }

            const newPostList = [
                {
                    id: "test",
                    comment: "test comment",
                    creted_at: ""
                }
            ]
            const newPostsImagesList = [
                {
                    0: "/image/カジノ１.jpg",
                    1: "/image/test.mov"
                }
            ]
            const newUser = [
                { name: "testname" }
            ]
            const newLikeList = [
                ""
            ]
            const newLikevisible = [
                true
            ]
            const newComments = [
                1
            ]

            setPostList(newPostList)
            setImageList(newPostsImagesList)
            setUsers(newUser)
            setLikeList(newLikeList)
            setLikevisible(newLikevisible)
            setComments(newComments)
        })()
    }, [currentUser])

    console.log('imageList', imageList)
    imageList.forEach((_: any, index: number) => {
        ref[index] = createRef()
    });


    return (
        <div>
            <Header />
            <h1>みんなの思い出</h1>
            {postList.map((post: any, i: number) => {
                // const created_at = dayjs(post.created_at.toDate())
                const created_at = dayjs()
                return (
                    <div key={i}>
                        <p>------------------------------</p>
                        <p>{users[i].name} {created_at.format('YYYY.MM.DD')}</p>
                        <p>{post.comment}</p>
                        {Object.keys(imageList[i]).map(key => {
                            return (
                                imageList[i][key].includes('.png') || imageList[i][key].includes('.jpg') || imageList[i][key].includes('.jpeg')
                                    ?
                                    <div key={i}>
                                        <NextImage key={key} src={imageList[i][key]} width={275} height={275} alt="投稿画像" ref={ref[i]} />
                                    </div>
                                    :
                                    <div key={i}>
                                        <video src={imageList[i][key]} width={275} height={275} ref={ref[i]} />
                                        <button onClick={() => videoPlay(i)}>再生</button>
                                    </div>
                            )
                        })}
                        {likevisible[i] ?
                            <div>
                                <button onClick={() => deleteLiked(post.id, i)}>いいね済み</button>
                                {likeList[i].length}
                            </div>
                            :
                            <div>
                                <button onClick={() => addLiked(post.id, i)}>いいね</button>
                                {likeList[i].length}
                            </div>
                        }
                        <button value={post.id} onClick={(e) => commentSubmit(e.target.value, i)}>コメント</button>{comments[i]}
                    </div>
                )
            })}
            <Footer />
        </div>
    )
}
