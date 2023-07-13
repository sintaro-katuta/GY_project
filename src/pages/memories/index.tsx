//* Firebase関連
import { db } from '../../lib/firebase.config';
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, orderBy, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
//* Headerコンポーネント
import Header from "../../components/header";
//* React Next関連
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
//* css
import styles from '../../styles/Memories.module.css'
//* day.js関連   
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ja from 'dayjs/locale/ja';

export default function Memories() {
    // *dayjsの詳細設定
    dayjs.locale(ja);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

    const [postsData, setPostsData]: any = useState([])
    const [selectCategory, setSelectCategory]: any = useState("ショップ")
    const [hashtags, setHashtags]: any = useState([])
    const [allHashtags, setAllHashtags]: any = useState({})
    const [likeList, setLikeList]: any = useState([])
    // ユーザー情報
    const [currentUser, setCurrentUser]: any = useState([])
    // firebaseAuth関連
    const auth = getAuth()
    const router = useRouter()
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
            //* 投稿取得
            const posts = collection(db, "posts")
            const q = query(posts, orderBy("created_at", "desc"));
            const postsDocs = await getDocs(q)
            const newPostData: any[] = await postsDocs.docs.map((doc: any) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            //* ログインユーザがいいねしているかチェック
            let newLikeList: any = []
            function checkString(array: any, uid: string) {
                return array.includes(uid);
            }
            newPostData.forEach((element: any) => {
                newLikeList.push(checkString(element.liked, currentUser.uid))
            });
            setPostsData(newPostData)
            setLikeList(newLikeList)
        })()
    }, [currentUser])

    useEffect(() => {
        (async () => {
            const hashtags = collection(db, "hashtags")
            const hashtagsDoc = doc(hashtags, "hashtag")
            const hashtagShapshot = getDoc(hashtagsDoc)
            const newHashtag = await hashtagShapshot.then((value: any) => {
                return value.data()[selectCategory]
            })
            setHashtags(newHashtag)
            const newAllHashtag = await hashtagShapshot.then((value: any) => {
                return value.data()
            })
            setAllHashtags(newAllHashtag)
        })()
    }, [selectCategory])

    const hashtagFilter = async (hashtag: string) => {
        window.scroll({ top: 600, behavior: 'smooth' });
        const posts = collection(db, "posts")
        const q = await query(posts, where("hashtag", "array-contains-any", [hashtag]), orderBy("created_at", "desc"))
        const postsSnapShot = await getDocs(q)
        const newPostData = await postsSnapShot.docs.map((doc: any) => {
            if (doc.exists()) {
                return doc.data()
            }
        })
        setPostsData(newPostData)
    }

    const reset = async () => {
        window.scroll({ top: 600, behavior: 'smooth' });
        const posts = collection(db, "posts")
        const q = query(posts, orderBy("created_at", "desc"));
        const postsDocs = await getDocs(q)
        const newPostData: any[] = await postsDocs.docs.map((doc: any) => {
            const item = doc.data()
            item.id = doc.id
            return item
        })
        setPostsData(newPostData)
    }

    const addLiked = async (id: any) => {
        const posts = collection(db, "posts")
        const postsDoc = doc(posts, id)
        await updateDoc(postsDoc, {
            ["liked"]: arrayUnion(currentUser.uid)
        })
        const q = query(posts, orderBy("created_at", "desc"));
        const postsDocs = await getDocs(q)
        const newPostData = await postsDocs.docs.map((doc: any) => {
            const item = doc.data()
            item.id = doc.id
            return item
        })

        //* ログインユーザがいいねしているかチェック
        let newLikeList: any = []
        newPostData.forEach((element: any, i: number) => {
            element.liked.forEach((e: any) => {
                if (e == currentUser.uid) {
                    //* いいね済み
                    newLikeList[i] = true
                }
            });
        });
        setPostsData(newPostData)
        setLikeList(newLikeList)
    }

    const removeLiked = async (id: any) => {
        const posts = collection(db, "posts")
        const postsDoc = doc(posts, id)
        await updateDoc(postsDoc, {
            ["liked"]: arrayRemove(currentUser.uid)
        })
        const q = query(posts, orderBy("created_at", "desc"));
        const postsDocs = await getDocs(q)
        const newPostData = await postsDocs.docs.map((doc: any) => {
            const item = doc.data()
            item.id = doc.id
            return item
        })
        //* ログインユーザがいいねしているかチェック
        let newLikeList: any = []
        newPostData.forEach((element: any, i: number) => {
            element.liked.forEach((e: any) => {
                if (e == currentUser.uid) {
                    //* いいね済み
                    newLikeList[i] = true
                }
            });
        });
        setPostsData(newPostData)
        setLikeList(newLikeList)
    }

    const toDetail = async (id: number) => {
        router.push(`/memories/${id}`)
    }

    return (
        <>
            <Header />
            <div className={styles.wrap}>
                <div className={styles.leftContent}>
                    <div className={styles.sidebar}>
                        <p className={styles.themeText}>ハッシュタグやカテゴリー別で絞りこめます。</p>
                        <div className={styles.categoryHashtag}>
                            <p className={styles.selectCategoryText}>カテゴリー：{selectCategory}</p>
                            <div className={styles.hashtags}>
                                {hashtags.map((hashtag: any, i: number) => {
                                    return (
                                        <small key={i} className={styles.hashtag} onClick={(e: any) => hashtagFilter(e.target.innerHTML)}>{hashtag}</small>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.category} onClick={() => setSelectCategory("ショップ")}>
                            <p className={styles.categoryText}>ショップ</p>
                            <p className={styles.categoryText}>{allHashtags["ショップ"] && <div>(全{allHashtags["ショップ"].length}件)</div>}</p>
                        </div>
                        <div className={styles.category} onClick={() => setSelectCategory("グルメ")}>
                            <p className={styles.categoryText}>グルメ</p>
                            <p className={styles.categoryText}>{allHashtags["グルメ"] && <div>(全{allHashtags["グルメ"].length}件)</div>}</p>
                        </div>
                        <div className={styles.category} onClick={() => setSelectCategory("カジノ")}>
                            <p className={styles.categoryText}>カジノ</p>
                            <p className={styles.categoryText}>{allHashtags["カジノ"] && <div>(全{allHashtags["カジノ"].length}件)</div>}</p>
                        </div>
                        <div className={styles.category} onClick={() => setSelectCategory("宿泊")}>
                            <p className={styles.categoryText}>宿泊</p>
                            <p className={styles.categoryText}>{allHashtags["宿泊"] && <div>(全{allHashtags["宿泊"].length}件)</div>}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.rightContent}>
                    <div className={styles.reloadIcon}>
                        <Image src={"/image/reset_undo_arrow_icon.svg"} width={20} height={20} alt="リロードアイコン" onClick={() => reset()} className={styles.Icon} />
                    </div>
                    <p className={styles.themeText2}>IRでの思い出やクチコミを残してみよう！</p>
                    {postsData.map((post: any, i: number) => {
                        const created_at = dayjs(post.created_at.toDate())
                        return (
                            <div className={styles.flame} key={i}>
                                <div className={styles.contents}>
                                    <div className={styles.header}>
                                        <h4 className={styles.headerContent}>{post.user}</h4>
                                        <small className={styles.headerContent}>
                                            {created_at.format('YYYY.MM.DD HH:mm')}/
                                            {post.category.map((category: any) => {
                                                return (
                                                    <>
                                                        {category}/
                                                    </>
                                                )
                                            })}
                                        </small>
                                    </div>
                                    <div>
                                        <div className={styles.hashtag2}>
                                            {post.hashtag.map((hashtag: any) => {
                                                return (
                                                    <>
                                                        <small onClick={(e: any) => hashtagFilter(e.target.innerHTML)}>{hashtag}</small><div>/</div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                        <p className={styles.comment}>{post.comment}</p>
                                    </div>
                                    <div className={styles.footer}>
                                        {likeList[i]
                                            ?
                                            // <div className={styles.removeLikeIcon} onClick={() => removeLiked(post.id)}></div>
                                            <Image src={"/image/Group 76.svg"} width={20} height={20} alt="いいね済みアイコン" className={styles.Icon} onClick={() => removeLiked(post.id)} />
                                            :
                                            // <div className={styles.addLikeIcon} onClick={() => removeLiked(post.id)}></div>
                                            <Image src={"/image/Group 75.svg"} width={20} height={20} alt="いいねアイコン" className={styles.Icon} onClick={() => addLiked(post.id)} />
                                        }
                                        <div>{Object.keys(post.liked).length}</div>
                                        <Image src={"/image/Group 74.svg"} width={20} height={20} alt="コメントアイコン" className={styles.Icon} onClick={() => toDetail(post.id)} />
                                        <div>{post.comments && post.comments.length}</div>
                                    </div>
                                </div>
                                <div className={styles.images}>
                                    {post.image.map((image: any) => {
                                        return (
                                            <>
                                                {image.includes('.png') || image.includes('.jpg') || image.includes('.jpeg')
                                                    ?
                                                    <div key={i}>
                                                        <Image src={image} width={144} height={144} alt={"みんなのアルバム"} />
                                                    </div>
                                                    :
                                                    <div key={i}>
                                                        <video controls src={image} width={144} height={144} />
                                                    </div>
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}