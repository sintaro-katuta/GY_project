// Firebaseの初期化を行うためfirebaseAppをインポート
import { getAuth } from "firebase/auth"
import { useState, useEffect } from 'react'
import styles from '../styles/Post.module.css'
import Image from 'next/image';
import Category from '../components/category'
import SelectImage from '../components/selectImage'
import Comment from '../components/comment'
import Hashtag from '../components/hashtag'
import PostResult from '../components/postResult';

export default function Post() {
    // 画像・画像パス・コメント定数
    const [image, setImage] = useState([])
    const [category, setCategory] = useState([])
    const [comment, setComment] = useState("")
    const [hashtag, setHashtag] = useState([])
    const [originalHashtag, setOriginalHashtag] = useState("")
    const [visibleList, setVisibleList] = useState([true, false, false, false, false])
    const [postData, setPostData] = useState({})

    // ユーザー情報
    const [currentUser, setCurrentUser]: any = useState([])
    // firebaseAuth関連
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
        const newPostData = {
            user: currentUser.displayName,
            category: category,
            image: image,
            comment: comment,
            hashtag: hashtag
        }
        setPostData(newPostData)
    }, [visibleList, currentUser, category, image, comment, hashtag])

    const handleVisible = (newData: any) => {
        setVisibleList(newData);
    };

    const handleCategory = (newData: any) => {
        setCategory(newData)
    }

    const handleImage = (newData: any) => {
        setImage(newData)
    }

    const handleComment = (newData: any) => {
        setComment(newData)
    }

    const handleHashtag = (newData: any) => {
        setHashtag(newData)
    }
    const handleOriginalHashtag = (newData: any) => {
        setOriginalHashtag(newData)
    }

    return (
        <>
            <div className={styles.flame}>
                <Image className={styles.topleft}
                    src={"/image/Group 86.png"}
                    width={310} height={320} alt='topleft'
                />

                <Image className={styles.bottomright}
                    src={"/image/Group 87.png"}
                    width={310} height={320} alt='bottomright'
                />
                <div className={styles.flame1}>
                    {visibleList.map((visible: boolean, i: number) => {
                        if (visible && i == 0) {
                            return (<Category handleVisible={handleVisible} handleCategory={handleCategory} categorys={category} key={i} />)
                        } else if (visible && i == 1) {
                            return (<SelectImage handleVisible={handleVisible} handleImage={handleImage} key={i} />)
                        } else if (visible && i == 2) {
                            return (<Comment handleVisible={handleVisible} handleComment={handleComment} key={i} />)
                        } else if (visible && i == 3) {
                            return (<Hashtag handleVisible={handleVisible} handleHashtag={handleHashtag} handleOriginalHashtag={handleOriginalHashtag} category={category} key={i} />)
                        } else if (visible && i == 4) {
                            return (<PostResult handleVisible={handleVisible} postData={postData} originalHashtag={originalHashtag} key={i} />)
                        }
                    })}
                </div>
            </div>
        </>
    )
}