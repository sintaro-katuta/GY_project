//* firebase関連
import { db } from '../../lib/firebase.config';
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, getDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
//* React Next関連
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
//* css
import styles from '../../styles/DetailPost.module.css'
//* day.js関連   
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ja from 'dayjs/locale/ja';

export default function Post() {
    const router = useRouter();
    const auth = getAuth()
    // *dayjsの詳細設定
    dayjs.locale(ja);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

    const [post, setPost]: any = useState({})
    const [comment, setComment]: any = useState("")
    const [currentUser, setCurrentUser]: any = useState([])

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
    }, [auth, router])

    useEffect(() => {
        (async () => {
            const { post_id }: any = router.query;
            const posts: any = collection(db, "posts")
            const postsDoc: any = doc(posts, `${post_id}`)
            const postsSnapShot: any = await getDoc(postsDoc)
            const newPostData = await postsSnapShot.data()
            console.log(newPostData)
            setPost(newPostData)
        })()
    }, [router.query])

    const addComment = async (e: any) => {
        e.preventDefault()
        if (comment) {
            const { post_id }: any = router.query;
            const posts = collection(db, 'posts')
            const postsDoc = doc(posts, `${post_id}`)
            const postCommentsData = {
                user: currentUser.displayName,
                comment: comment,
                created_at: new Date()
            }
            updateDoc(postsDoc, {
                ["comments"]: arrayUnion(postCommentsData)
            })
            const postsGetDoc = await getDoc(postsDoc)
            setComment("")
            setPost(postsGetDoc.data())
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>{post.comment}</h1>
                    <p className={styles.hashtag}>{post.hashtag}</p>
                </div>
                <div className={styles.headerImage}>
                    {post.image && post.image.map((image: any, i: number) => {
                        if (image.includes('.png') || image.includes('.jpg') || image.includes('.jpeg')) {
                            return (<Image src={image} width={100} height={100} alt="投稿画像" key={i} />)
                        } else {
                            return (<video src={image} width="100" height="100" key={i} />)
                        }
                    })}
                </div>
            </div>
            <div className={styles.headerTitle}><button onClick={() => router.push("/memories")} className={styles.backButton}><Image src={'/image/arrow.svg'} width={15} height={15} alt="アカウントアイコン" /></button><div>{post.user}</div><div>/</div><div>{post.created_at && dayjs(post.created_at.toDate()).format('YYYY.MM.DD HH:mm')}</div><div>/</div>{post.category && post.category.map((category: any, i: number) => { return (<div className={styles.categoryText} key={i}><div>{category}</div><div>/</div></div>) })}</div>
            <div className={styles.comment}>
                <form onSubmit={(e) => addComment(e)} className={styles.form}>
                    <input type="text" id="comment" placeholder="コメント" value={comment} className={styles.commentField} onChange={(e) => setComment(e.target.value)} />
                    <Image src={"/image/send_icon.svg"} width={20} height={20} alt="送信アイコン" onClick={(e: any) => addComment(e)} className={styles.icon} />
                </form>
                <div className={styles.commentParent}>
                    {post.comments && post.comments.map((comment: any, i: number) => {
                        return (
                            <p key={i} className={styles.commentText}><div className={styles.userName}><Image src={"/image/acount.svg"} width={15} height={15} alt="アカウントアイコン" />{comment.user} {dayjs(comment.created_at.toDate()).format('YYYY.MM.DD HH:mm')} </div><br /><div className={styles.commentSpan}>{comment.comment}</div></p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};