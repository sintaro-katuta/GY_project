import { useState, useEffect, useRef, createRef } from 'react'
import { collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeFirebaseApp, db } from '../lib/firebase.config';
import Image from 'next/image'
import styles from '../styles/Post.module.css'

export default function Haxh({ handleVisible, handleHashtag }: any) {
    const [DBHashtag, setDBHashtag] = useState([])

    const ref = useRef()

    let newHashtag: any = []

    const checkMax: number = 5
    let checkbox: number = 0

    useEffect(() => {
        const hashtags = collection(db, "hashtags")
        const hashtagsDoc = doc(hashtags, "hashtag")
        const hashtagShapshot = getDoc(hashtagsDoc)
        hashtagShapshot.then((value: any) => {
            setDBHashtag(value.data().name)
        })
    }, [])

    const selectHashtag = (e: any) => {
        if (e.target.checked) {
            if (checkMax > checkbox) {
                newHashtag.push(e.target.value)
                checkbox++;
            } else {
                alert("ハッシュタグは５つまでです")
                e.target.checked = false
            }
        } else {
            newHashtag.pop()
            checkbox--;
        }
    }


    const backButton = () => {
        const newVisibleList = [false, false, true, false, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        const newVisibleList = [false, false, false, false, true]
        if (newHashtag.length <= 0) {
            alert("一つ以上選択してくだいさい")
        } else {
            handleVisible(newVisibleList)
            handleHashtag(newHashtag)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.checkImage}>
                <Image src={"/image/Group 132.svg"} alt="チェック" width={846} height={51} />
            </div>
            <div className={styles.bodyDiv}>
                <p className={styles.themeText}>最後に投稿するハッシュタグをつけましょう！</p>
                <div className={styles.nextButtonDiv}>
                    <form ref={ref} className={styles.checkboxForm}>
                        {DBHashtag.map((element: any, i: number) => {
                            return (
                                <label key={i} className={styles.checkboxLabel}>
                                    <input type="checkbox" value={element} name="hashtags" onChange={(e) => selectHashtag(e)} className={styles.checkbox} />{element}
                                </label>
                            )
                        })}
                    </form>
                    <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                    <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>次の項目へ</span><span className={styles.allow}>▶</span></button>
                </div>
            </div>
        </div>
    )
}