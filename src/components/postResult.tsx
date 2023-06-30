import { useState } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from '../styles/Post.module.css'
import { db } from '../lib/firebase.config'
import { collection, addDoc } from 'firebase/firestore'
import { postImage } from '../pages/api/upload'

export default function PostResult({ handleVisible, postData }: any) {

    const [visible, setVisible] = useState(false)
    const router = useRouter()

    const backButton = () => {
        const newVisibleList = [false, false, false, true, false]
        handleVisible(newVisibleList)
    }

    const nextButton = async () => {
        let newPostData: any = postData
        console.log(newPostData)
        for (let i = 0; i < postData.image.length; i++) {
            const result = await postImage(postData.image[i])
            newPostData.image[i] = result
        }
        console.log("newPostData", newPostData)
        const posts = collection(db, 'posts')
        await addDoc(posts, newPostData)
        setVisible(true)
    }
    return (
        <div className={styles.container}>
            {visible
                ?
                <>
                    投稿が完了しました
                    <button onClick={() => router.push("/")}>ホームへ</button>
                </>

                :
                <>
                    <div className={styles.checkImage}>
                        <Image src={"/image/Group 133.svg"} alt="チェック" width={846} height={51} />
                    </div>
                    <div className={styles.category_hashtag_comment}>
                        <div className={styles.category_hashtag}>
                            <div className={styles.categoryDiv}>
                                <p className={styles.category}>カテゴリー</p>
                                <p className={styles.resultText}>
                                    {postData.category.map((category, i) => {
                                        return (
                                            <>{category}</>
                                        )
                                    })}
                                </p>
                            </div>
                            <div className={styles.hashtagDiv}>
                                ハッシュタグ
                                <p className={styles.resultText}>{postData.hashtag}</p>
                            </div>
                        </div>
                        <div className={styles.comment}>
                            文章
                            <p className={styles.resultTextComment}>{postData.comment}</p>
                        </div>
                    </div>
                    <div className={styles.resultImageDiv}>
                        <p className={styles.resultImageText}>写真</p>
                        <div className={styles.resultImage}>
                            {postData.image.map((image, i) => {
                                const imageURL = URL.createObjectURL(image)
                                return (
                                    <>
                                        {image.name.includes('.png') || image.name.includes('.jpg') || image.name.includes('.jpeg')
                                            ?
                                            <div className={styles.resultDivImage}>
                                                <Image src={imageURL} width={184} height={184} alt={`画像${i}`} className={styles.image} />
                                            </div>
                                            :
                                            <div>
                                                <video src={imageURL} width={184} height={184} className={styles.image} controls />
                                            </div>
                                        }
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.nextButtonDiv}>
                        <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                        <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>投稿する</span><span className={styles.allow}>▶</span></button>
                    </div>
                </>
            }
        </div>
    )
}