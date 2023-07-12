import { useState } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from '../styles/Post.module.css'
import { db } from '../lib/firebase.config'
import { collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { postImage } from '../pages/api/upload'
import { gsap } from "gsap";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../public/image/crucker.json'


export default function PostResult({ handleVisible, postData, originalHashtag }: any) {

    const [visible, setVisible] = useState(false)
    const router = useRouter()

    const backButton = () => {
        const newVisibleList = [false, false, false, true, false]
        handleVisible(newVisibleList)
    }

    const nextButton = async () => {
        let newPostData: any = postData
        for (let i = 0; i < postData.image.length; i++) {
            const result = await postImage(postData.image[i])
            newPostData.image[i] = result
        }
        const posts = collection(db, 'posts')
        await addDoc(posts, newPostData)
        if (originalHashtag.length > 0) {
            const hashtags = collection(db, "hashtags")
            const hashtagsDoc = doc(hashtags, "hashtag")
            for (let i in newPostData.category) {
                await updateDoc(hashtagsDoc, {
                    [newPostData.category[i]]: arrayUnion(originalHashtag)
                })
            }
        }
        setVisible(true)
        setTimeout(textAnimation, 15)
    }

    const change = (name: string) => {
        let newVisibleList: boolean[] = []
        if (name === "category") {
            newVisibleList = [true, false, false, false, false]
        } else if (name === "image") {
            newVisibleList = [false, true, false, false, false]
        } else if (name === "comment") {
            newVisibleList = [false, false, true, false, false]
        } else if (name === "hashtag") {
            newVisibleList = [false, false, false, true, false]
        }
        handleVisible(newVisibleList)
    }

    const textAnimation = () => {
        let animationElement = document.querySelectorAll(".animationText")
        animationElement.forEach((element: any, i: number) => {
            gsap.from(element, {
                opacity: 0,
                scale: 0,
                yPercent: 150,
                ease: "back",
                duration: 0.5,
                delay: i * 0.05
            });
        })
    }
    return (
        <div className={styles.container}>
            {visible
                ?
                <>
                    <Player
                        autoplay={true}
                        loop={false}
                        controls={false}
                        src={animationData}
                        style={{ height: '560px' }}
                    />
                    <p className={styles.success}>
                        <span className="animationText">投</span>
                        <span className="animationText">稿</span>
                        <span className="animationText">が</span>
                        <span className="animationText">完</span>
                        <span className="animationText">了</span>
                        <span className="animationText">し</span>
                        <span className="animationText">ま</span>
                        <span className="animationText">し</span>
                        <span className="animationText">た</span>
                        <span className="animationText">!</span>
                    </p>
                    <button onClick={() => router.push("/")} className={styles.successButton}>ホームへ</button>
                </>
                :
                <>
                    <div className={styles.checkImage}>
                        <Image src={"/image/Group 133.svg"} alt="チェック" width={846} height={51} />
                    </div>
                    <div className={styles.category_hashtag_comment}>
                        <div className={styles.category_hashtag}>
                            <div className={styles.categoryDiv}>
                                <p className={styles.category}>カテゴリー<small className={styles.resultChange} onClick={() => change("category")}>変更する</small></p>
                                <p className={styles.resultText}>
                                    {postData.category.map((category: any, i: number) => {
                                        return (
                                            <> {category} </>
                                        )
                                    })}
                                </p>
                            </div>
                            <div className={styles.hashtagDiv}>
                                ハッシュタグ<small className={styles.resultChange} onClick={() => change("hashtag")}>変更する</small>
                                <p className={styles.resultText}>{postData.hashtag}</p>
                            </div>
                        </div>
                        <div className={styles.comment}>
                            文章<small className={styles.resultChange} onClick={() => change("comment")}>変更する</small>
                            <p className={styles.resultTextComment}>{postData.comment}</p>
                        </div>
                    </div>
                    <div className={styles.resultImageDiv}>
                        <p className={styles.resultImageText}>写真<small className={styles.resultChange} onClick={() => change("image")}>変更する</small></p>
                        <div className={styles.resultImage}>
                            {postData.image.map((image: any, i: number) => {
                                const imageURL = URL.createObjectURL(image)
                                return (
                                    <>
                                        {image.name.includes('.png') || image.name.includes('.jpg') || image.name.includes('.jpeg')
                                            ?
                                            <div className={styles.resultDivImage} key={i}>
                                                <Image src={imageURL} width={154} height={154} alt={`画像${i}`} className={styles.imageResult} />
                                            </div>
                                            :
                                            <div className={styles.resultDivImage} key={i}>
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