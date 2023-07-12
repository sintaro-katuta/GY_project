import { useState, useEffect } from 'react'
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from '../lib/firebase.config';
import Image from 'next/image'
import styles from '../styles/Post.module.css'

export default function Hashtag({ handleVisible, handleHashtag, handleOriginalHashtag, category }: any) {
    const [DBHashtag, setDBHashtag] = useState([])
    const [originalHashtag, setOriginalHashtag] = useState("")
    const [hashtag, setHashtag] = useState([])
    const [ErrorMessage, setErrorMessage] = useState("")

    const checkMax: number = 5

    useEffect(() => {
        (async () => {
            const hashtags = collection(db, "hashtags")
            const hashtagsDoc = doc(hashtags, "hashtag")
            const hashtagShapshot = getDoc(hashtagsDoc)
            let newHashtag: any = []
            await hashtagShapshot.then((value: any) => {
                for (let i in category) {
                    newHashtag.push(value.data()[category[i]])
                }
            })
            setDBHashtag(newHashtag)
        })()
    }, [category])

    const selectHashtag = (e: any) => {
        setErrorMessage("")
        const newHashtag: any = [...hashtag]
        if (!e.target.value || e.target.value === '#') {
            e.target.checked = false
        }
        if (e.target.checked) {
            if (newHashtag.length < checkMax) {//チェックがついているとき
                if (e.target.value === '#' || e.target.value) {
                    newHashtag.push(e.target.value)
                }
            } else {
                // newHashtag.pop()
                e.target.checked = false
                setErrorMessage("５つ以下選択してください")
            }
        } else {
            if (e.target.value === '#' || e.target.value) {
                newHashtag.pop()
            }
        }
        setHashtag(newHashtag)
    }

    const addOriginalHashtag = (name: string) => {
        setErrorMessage("")
        let originalHashtagElement: any = document.querySelector("#originalHashtag")
        let originalHashtagCheckboxElement: any = document.querySelector("#originalHashtagCheckbox")
        originalHashtagCheckboxElement.checked = false
        const newHashtag = hashtag
        newHashtag.pop()
        console.log(newHashtag)
        let searchH: number = name.indexOf('#', 1)
        const searchZ: number = name.indexOf('＃', 1)
        if (name.startsWith('#')) {
            if (searchH !== -1 || searchZ !== -1) {//#が見つかったとき
                originalHashtagElement.value = name.slice(0, searchZ)
            }
        } else {
            originalHashtagElement.value = `#${name.replace("#", "")}`
        }
        setOriginalHashtag(name)
    }


    const backButton = () => {
        const newVisibleList = [false, false, true, false, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        const newVisibleList = [false, false, false, false, true]
        if (hashtag.length < 1) {
            setErrorMessage("ハッシュタグを１つ以上選択してください")
        } else if (hashtag.length > 5) {
            setErrorMessage("ハッシュタグを５つ以下選択してください")
        } else {
            if (originalHashtag.length > 1) {
                handleOriginalHashtag(originalHashtag)
            }
            handleVisible(newVisibleList)
            handleHashtag(hashtag)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.checkImage}>
                <Image src={"/image/Group 132.svg"} alt="チェック" width={846} height={51} />
            </div>
            <div className={styles.bodyDiv}>
                <p className={styles.themeText}>最後に投稿するハッシュタグをつけましょう！</p>
                <p className={styles.error}>{ErrorMessage}</p>
                <form className={styles.checkboxForm}>
                    {DBHashtag.map((element: any) => {
                        return (
                            <>
                                {element.map((el: any, j: any) => {
                                    return (
                                        <label key={j} className={styles.checkboxLabel} >
                                            <input type="checkbox" value={el} name="hashtags" onChange={(e) => selectHashtag(e)} className={styles.checkbox} />{el}
                                        </label>
                                    )
                                })}
                            </>
                        )
                    })}
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" value={originalHashtag} onChange={(e) => selectHashtag(e)} className={styles.checkbox} id="originalHashtagCheckbox" />
                        <input type="text" defaultValue={"#"} onChange={(e) => addOriginalHashtag(e.target.value)} className={styles.originalHashtag} id="originalHashtag" />
                    </label>
                </form>
                <div className={styles.nextButtonDiv}>
                    <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                    <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>次の項目へ</span><span className={styles.allow}>▶</span></button>
                </div>
            </div>
        </div >
    )
}