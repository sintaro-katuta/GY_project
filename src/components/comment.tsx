import { useState, useEffect, useRouter } from 'react'
import Image from 'next/image'
import styles from '../styles/Post.module.css'

export default function Comment({ handleVisible, handleComment }: any) {
    const [comment, setComment] = useState("")

    const backButton = () => {
        const newVisibleList = [false, true, false, false, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        console.log(comment.length)
        if (comment.length <= 0 || comment.length >= 100) {
            alert("文字数は0字以上100字以内")
        } else {
            const newVisibleList = [false, false, false, true, false]
            handleVisible(newVisibleList)
            handleComment(comment)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.checkImage}>
                <Image src={"/image/Group 131.svg"} alt="チェック" width={846} height={51} />
            </div>
            <div className={styles.bodyDiv}>
                <p className={styles.themeTextComment}>次に投稿する文章を入力しましょう！</p>
                <textarea cols="30" rows="10" placeholder="コメント" onChange={(e) => setComment(e.target.value)} className={styles.textarea} />
                <div className={styles.nextButtonDiv}>
                    <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                    <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>次の項目へ</span><span className={styles.allow}>▶</span></button>
                </div>
            </div>
        </div>
    )
}