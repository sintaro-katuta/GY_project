import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase.config';
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import NextImage from 'next/image';

export default function Post() {
    const router = useRouter();
    const query = router.query;
    const auth = getAuth()
    const { post_id } = router.query;

    const [post, setPost] = useState({})
    const [postUser, setPostUser] = useState({})
    const [postImages, setPostImages] = useState([])
    const [postLiked, setPostLiked] = useState([])
    const [postLikedVisible, setPostLikedVisible] = useState(false)
    const [postComments, setPostComments] = useState([])
    const [comment, setComment] = useState("")
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)

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

    useEffect(() => {
        if (router.isReady) {
            const posts = collection(db, "posts")
            const postsDoc = doc(posts, post_id)
            const postsSnapShot = getDoc(postsDoc)
            postsSnapShot.then((ps: any) => {
                if (ps.exists()) {
                    const psitem = ps.data()
                    psitem.id = ps.id
                    setPost(psitem)
                    const users = collection(db, "users")
                    const usersDoc = doc(users, psitem.user)
                    const usersSnapshot = getDoc(usersDoc)
                    usersSnapshot.then((us: any) => {
                        if (us.exists()) {
                            const usitem = us.data()
                            setPostUser(usitem)
                        }
                    })
                    const posts_images = collection(db, "posts_images")
                    const postsImagesDoc = doc(posts_images, psitem.id)
                    const postsImagesSnapshot = getDoc(postsImagesDoc)
                    postsImagesSnapshot.then((pis: any) => {
                        setPostImages(pis.data().image)
                    })
                    const likes = collection(db, 'likes')
                    const likedDoc = doc(likes, psitem.id)
                    const likedSnapshot = getDoc(likedDoc)

                    likedSnapshot.then((ls: any) => {
                        if (ls.exists()) {
                            for (let i = 0; i < ls.data().user.length; i++) {
                                if (ls.data().user[i] == currentUser?.uid) {
                                    setPostLikedVisible(true)
                                } else {
                                    setPostLikedVisible(false)
                                }
                            }
                            setPostLiked(ls.data().user)
                        }
                    })
                    const postsComments = collection(db, 'posts_comments')
                    const postsCommentsDoc = doc(postsComments, post_id)
                    const postsCommentsSnapshot = getDoc(postsCommentsDoc)
                    postsCommentsSnapshot.then((psm: any) => {
                        if (psm.exists()) {
                            setPostComments(psm.data())
                        }
                    })
                }
            })
        }
    }, [router, query, currentUser])

    const addLiked = () => {
        const likes = collection(db, 'likes')
        const likedDoc = doc(likes, post.id)
        let newPost_liked = [...postLiked]
        newPost_liked.push(currentUser.uid)
        const likedData = {
            user: newPost_liked
        }
        setDoc(likedDoc, likedData)
        setPostLiked(likedData)
        setPostLikedVisible(true)
    }

    const deleteLiked = () => {
        const likes = collection(db, 'likes')
        const likedDoc = doc(likes, post.id)
        let newPost_liked = [...postLiked]
        const idx = newPost_liked.indexOf(currentUser.uid)
        if (idx >= 0) {
            newPost_liked.splice(idx, 1)
        }
        const likedData = {
            user: newPost_liked
        }
        setDoc(likedDoc, likedData)
        setPostLiked(newPost_liked)
        setPostLikedVisible(false)
    }

    const addComment = () => {
        const postsComments = collection(db, 'posts_comments')
        const postsCommentsDoc = doc(postsComments, post.id)
        const postCommentsData = {
            user: currentUser.displayName,
            comment: comment,
            created_at: serverTimestamp()
        }
        let newPostCommentsData: any = { ...postComments }
        newPostCommentsData[Object.keys(newPostCommentsData).length] = postCommentsData
        setDoc(postsCommentsDoc, newPostCommentsData)
        setComment("")
        setPostComments(newPostCommentsData)

    }

    return (
        <div>
            <button onClick={() => router.push("/memories")}>←</button>
            {postUser.name}<br />
            {post.comment}<br />
            {Object.keys(postImages).map((key) => (
                <NextImage src={postImages[key]} width={270} height={270} alt="投稿画像" />
            ))}
            {postLiked.length}
            {postLikedVisible
                ? <button onClick={() => deleteLiked()}>いいね済み</button>
                : <button onClick={() => addLiked()}>いいね</button>
            }
            {Object.keys(postComments).map((key) => (
                <div key={key}>
                    <p>{postComments[key].user} {postComments[key].comment}</p>
                </div>
            ))}
            <input type="text" placeholder="コメント" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={() => addComment()}>送信</button>
        </div>
    );
};