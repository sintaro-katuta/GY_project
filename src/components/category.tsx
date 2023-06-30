import { useState, useEffect, useRouter } from 'react'
import Image from 'next/image'
import styles from '../styles/Post.module.css'

export default function Category({ handleVisible, handleCategory }: any) {
    const [buttonClass, setButtonClass] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        const newButtonClass = [
            styles.themeButton,
            styles.themeButton,
            styles.themeButton,
            styles.themeButton
        ]
        setButtonClass(newButtonClass)
    }, [])

    const buttonSubmit = (e: any, i: number) => {
        const newButtonClass = [...buttonClass]
        const newCategory = [...category]
        if (e.target.className.indexOf("themeButtonOn") !== -1) {
            newCategory.pop()
            newButtonClass[i] = styles.themeButton
        } else if (e.target.className.indexOf("themeButton") !== -1) {
            newButtonClass[i] = styles.themeButtonOn
            if (i === 0) {
                newCategory.push('ショップ')
            } else if (i === 1) {
                newCategory.push('グルメ')
            } else if (i === 2) {
                newCategory.push('カジノ')
            } else if (i === 3) {
                newCategory.push('宿泊')
            }
        }
        setButtonClass(newButtonClass)
        setCategory(newCategory)
    }

    const nextButton = () => {
        if (category.length <= 0) {
            alert("一つ以上選択してください")
        } else {
            const newVisibleList = [false, true, false, false, false]
            handleVisible(newVisibleList)
            handleCategory(category)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.checkImage}>
                <Image src={"/image/Group 114.svg"} alt="チェック" width={846} height={51} />
            </div>
            <div className={styles.bodyDiv}>
                <p className={styles.themeText}>まず初めに投稿するカテゴリーを選びましょう※複数可</p>
                <button className={buttonClass[0]} onClick={(e) => buttonSubmit(e, 0)}>ショップ</button>
                <button className={buttonClass[1]} onClick={(e) => buttonSubmit(e, 1)}>グルメ</button>
                <button className={buttonClass[2]} onClick={(e) => buttonSubmit(e, 2)}>カジノ</button>
                <button className={buttonClass[3]} onClick={(e) => buttonSubmit(e, 3)}>宿泊</button>
            </div>
            <div className={styles.nextButtonDiv}>
                <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>次の項目へ</span><span className={styles.allow}>▶</span></button>
            </div>
        </div>
    )
}