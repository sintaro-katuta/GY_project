import { useState, useEffect, useRouter } from 'react'
import Image from 'next/image'
import styles from '../styles/Post.module.css'

export default function Haxh({ handleVisible, handleHashtag }: any) {
    const [hashtag, setHashtag] = useState([])

    const backButton = () => {
        const newVisibleList = [false, false, true, false, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        const newVisibleList = [false, false, false, false, true]
        handleVisible(newVisibleList)
        handleHashtag(hashtag)
    }
    return (
        <>
            <div className={styles.checkImage}>
                <Image src={"/image/Group 132.svg"} alt="チェック" width={846} height={51} />
            </div>
            <input type="text" onChange={(e) => setHashtag(e.target.value)} />
            <div className={styles.nextButtonDiv}>
                <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>次の項目へ</span><span className={styles.allow}>▶</span></button>
            </div>
        </>
    )
}