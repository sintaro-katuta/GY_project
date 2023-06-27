import { useState } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from '../styles/Post.module.css'
import { postImage } from '../pages/api/upload'

export default function PostResult({ handleVisible, postData }: any) {

    const [visible, setVisible] = useState(false)
    const router = useRouter()

    const backButton = () => {
        const newVisibleList = [false, false, false, true, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        setVisible(true)
    }
    return (
        <>
            {console.log(postData)}
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
                    <div>
                        カテゴリー
                        {postData.category.map((category, i) => {
                            return (
                                <p>{category}</p>
                            )
                        })}
                    </div>
                    <div className={styles.imageDiv}>
                        画像
                        {postData.image.map((image, i) => {
                            const imageURL = URL.createObjectURL(image)
                            return (
                                <>
                                    {console.log(imageURL)}

                                    {image.name.includes('.png') || image.name.includes('.jpg') || image.name.includes('.jpeg')
                                        ?
                                        <>
                                            <Image src={imageURL} width={184} height={184} alt={`画像${i}`} className={styles.image} />
                                        </>
                                        :
                                        <>
                                            <video src={imageURL} width={184} height={184} className={styles.image} controls />
                                        </>
                                    }
                                </>
                            )
                        })}
                    </div>
                    <div>
                        コメント
                        <p>{postData.comment}</p>
                    </div>
                    <div>
                        ハッシュタグ
                        <p>{postData.hashtag}</p>
                    </div>
                    <div className={styles.nextButtonDiv}>
                        <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                        <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>投稿する</span><span className={styles.allow}>▶</span></button>
                    </div>
                </>
            }
        </>
    )
}