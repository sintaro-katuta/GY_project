// Firebaseの初期化を行うためfirebaseAppをインポート
import { getAuth } from "firebase/auth"
import { useState, useEffect } from 'react'
import styles from '../styles/Post.module.css'
import Category from '../components/category'
import SelectImage from '../components/selectImage'
import Comment from '../components/comment'
import Hashtag from '../components/hashtag'
import PostResult from '../components/postResult';

export default function Post() {
    // 画像・画像パス・コメント定数
    const [image, setImage]: any = useState([])
    const [category, setCategory]: any = useState([])
    const [comment, setComment]: any = useState("")
    const [hashtag, setHashtag]: any = useState([])
    const [originalHashtag, setOriginalHashtag]: any = useState("")
    const [visibleList, setVisibleList]: any = useState([true, false, false, false, false])
    const [postData, setPostData]: any = useState({})

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
        const newPostData: any = {
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
        </>
    )
}