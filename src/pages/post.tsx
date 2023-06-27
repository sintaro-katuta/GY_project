// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../lib/firebase.config';
import { getAuth } from "firebase/auth"
import { collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from 'react'
import NextImage from 'next/image';
import Category from '../components/category'
import SelectImage from '../components/selectImage'
import Comment from '../components/comment'
import Hashtag from '../components/hashtag'
import PostResult from '../components/postResult';
import postSuccess from '../components/postSuccess';
import { postImage } from "./api/upload";

export default function Post() {
    // 画像・画像パス・コメント定数
    const [image, setImage] = useState<FileList>([])
    const [createImageURL, setCreateImageURL] = useState([])
    const [category, setCategory] = useState([])
    const [comment, setComment] = useState("")
    const [hashtag, setHashtag] = useState([])
    const [visibleList, setVisibleList] = useState([true, false, false, false, false])
    const [postData, setPostData] = useState({})

    // ユーザー情報
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)
    const [postbtn, setPostbtn] = useState(true)
    // firebase関連
    const auth = getAuth()

    useEffect(() => {
        // ログイン状態をウォッチ
        auth.onAuthStateChanged((user) => {
            if (user) {
                // ユーザ情報を格納する
                setCurrentUser(user)
            }
        })
    }, [])

    useEffect(() => {
        console.log("つぎにすすんだか前に戻りました")
        const newPostData = {
            user: currentUser,
            category: category,
            image: image,
            comment: comment,
            hashtag: hashtag
        }
        setPostData(newPostData)
    }, [visibleList])

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

    return (
        <div>
            {console.log("postData", category, image, comment)}
            {visibleList.map((visible: boolean, i: number) => {
                if (visible && i == 0) {
                    return (<Category handleVisible={handleVisible} handleCategory={handleCategory} />)
                } else if (visible && i == 1) {
                    return (<SelectImage handleVisible={handleVisible} handleImage={handleImage} />)
                } else if (visible && i == 2) {
                    return (<Comment handleVisible={handleVisible} handleComment={handleComment} />)
                } else if (visible && i == 3) {
                    return (<Hashtag handleVisible={handleVisible} handleHashtag={handleHashtag} />)
                } else if (visible && i == 4) {
                    return (<PostResult handleVisible={handleVisible} postData={postData} />)
                }
            })}
        </div>
    )
}