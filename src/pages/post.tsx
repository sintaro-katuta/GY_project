// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../lib/firebase.config';
import { getAuth } from "firebase/auth"
import { collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react'
import NextImage from 'next/image';
import { postImage } from "./api/upload";

export default function Post() {
    // 画像・画像パス・コメント定数
    const [image, setImage] = useState<FileList>([])
    const [createImageURL, setCreateImageURL] = useState([])
    const [comment, setComment] = useState("")
    // 最大アップロード画像・動画数
    const maxUpload = 4
    // 最大アップロード画像・動画サイズ数 1MB
    const maxSize = 1000000
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

    // 画像をセットと画像のパスをセット関数
    const addImage = (e: any) => {
        // 最大アップロード数を超えていたときの処理
        if (e.target.files.length > maxUpload) {
            // 画像と画像のパスを空にする
            setImage();
            setCreateImageURL()
        } else {
            setImage(e.target.files)
            let list = []
            for (let i = 0; i < e.target.files.length; i++) {
                const imageUrl = URL.createObjectURL(e.target.files[i])
                list.push(imageUrl)
                setCreateImageURL(list)
            }
        }
    }

    // コメントをセット
    const addComment = (e) => {
        setComment(e.target.value)
    }

    // 削除ボタン押したときの処理
    const removeImage = (e: any) => {
        e.preventDefault()
        // 選択した画像は削除可能
        const newImages = [...image];
        const newUrl = [...createImageURL]
        newImages.splice(e.target.value, 1);
        newUrl.splice(e.target.value, 1);
        setImage(newImages);
        setCreateImageURL(newUrl)
    }

    // 投稿ボタン押したときの処理
    const postOnSubmit = async (e) => {
        setPostbtn(!postbtn)
        e.preventDefault();

        let totalSize = 0
        for (let i = 0; i < image.length; i++) {
            totalSize = totalSize + image[i].size
        }
        if (totalSize < maxSize) {
            // firebaseのpostsのコレクション処理
            const posts = collection(db, "posts");
            const postData = {
                user: currentUser.uid,
                comment: comment,
                created_at: serverTimestamp()
            }
            const post = await addDoc(posts, postData);
            const post_id = post.id

            let newPostsImages: any = {}

            // storageに画像を保存する処理
            for (let i = 0; i < image.length; i++) {
                // 繰り返し処理したいコードをここに記述する
                const result = await postImage(image[i], post_id);
                newPostsImages[i] = result;
            }
            const posts_images = collection(db, "posts_images");
            const posts_images_doc = doc(posts_images, post_id)
            const post_imagesData = {
                image: newPostsImages,
            }
            await setDoc(posts_images_doc, post_imagesData);
            alert("投稿しました")
        } else {
            alert("画像・動画を1MB以内で投稿してください")
        }
    }

    return (
        <div>
            <h1 onClick={() => console.log(currentUser)}>投稿</h1>
            <form>
                <input type="file" multiple accept="image/jpeg, image/png, image/gif, video/mp4, video/avi, video/quicktime" onChange={(e) => addImage(e)} />

                <label htmlFor="comment">コメント</label>
                <textarea id="comment" cols="30" rows="10" onChange={(e) => addComment(e)}></textarea>

                <ul style={{ display: "flex", listStyle: "none" }}>
                    {createImageURL && createImageURL.map((item, i) => {
                        return (
                            <li key={i}>
                                <NextImage alt="プレビュー画像" src={item} width={144} height={144} />
                                <button value={i} onClick={(e) => removeImage(e)}>削除</button>
                            </li>
                        )
                    }
                    )}
                </ul>
                {postbtn ?
                    <button onClick={(e) => postOnSubmit(e)}>投稿する</button>
                    :
                    <p>投稿中です・・・</p>
                }
            </form>
        </div >
    )
}