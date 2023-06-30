import Image from 'next/image'
import styles from '../styles/Post.module.css'
import { useState, useEffect, useRef, createRef } from 'react'

export default function SelectImage({ handleVisible, handleImage }: any) {
    const [image, setImage] = useState<FileList>([])
    const [createImageURL, setCreateImageURL] = useState([])
    const ref = useRef([])
    // 最大アップロード画像・動画数
    const maxUpload = 4
    // 最大アップロード画像・動画サイズ数 1MB
    const maxSize = 10485760


    // 画像をセットと画像のパスをセット関数
    const addImage = (e: any) => {
        // 最大アップロード数を超えていたときの処理
        if (e.target.files.length > maxUpload) {
            // 画像と画像のパスを空にする
            setImage([]);
            setCreateImageURL([])
        } else {
            let newImage = [...image]
            let newInputImage = [...e.target.files]
            let j = 0;
            const total = newImage.length + newInputImage.length
            let totalSize = 0
            for (let i = 0; i < image.length; i++) {
                totalSize = totalSize + image[i].size
            }
            if (total <= maxUpload && totalSize <= maxSize) {
                console.log("上限を超えていない")
                for (let i = newImage.length; i < total; i++) {
                    ref[i] = createRef()
                    newImage[i] = newInputImage[j]
                    j++;
                }
            } else {
                console.log("上限を超えています", total)
            }
            setImage(newImage)
            console.log("newImage", newImage)
            let list = [...createImageURL]
            for (let i = 0; i < newImage.length; i++) {
                const imageUrl = URL.createObjectURL(newImage[i])
                list[i] = imageUrl
            }
            setCreateImageURL(list)
        }
    }

    const videoPlay = (e: number) => {
        console.log(ref[e].current)
        ref[e].current.play()
    }

    const removeImage = (i: number) => {
        // 選択した画像は削除可能
        console.log(i)
        const newImages = [...image];
        const newUrl = [...createImageURL]
        newImages.splice(i, 1);
        newUrl.splice(i, 1);
        setImage(newImages);
        setCreateImageURL(newUrl)
    }

    const backButton = () => {
        const newVisibleList = [true, false, false, false, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        if (image.length <= 0) {
            alert("一つ以上選択してください")
        } else {
            const newVisibleList = [false, false, true, false, false]
            handleVisible(newVisibleList)
            handleImage(image)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.checkImage}>
                <Image src={"/image/Group 130.svg"} alt="チェック" width={846} height={51} />
            </div>
            <div className={styles.bodyDiv}>
                <p className={styles.themeText}>次に投稿する写真を選択しましょう！</p>
                <div>
                    <label htmlFor="file" className={styles.imageLabel}>
                        <input type="file" id="file" multiple accept="image/jpeg, image/png, image/gif, video/mp4, video/avi, video/quicktime" onChange={(e) => addImage(e)} className={styles.imageFile} />
                    </label>
                </div>
                <div className={styles.imageDiv}>
                    {createImageURL.length <= 0 &&
                        <>
                            <button className={styles.image}></button>
                            <button className={styles.image}></button>
                            <button className={styles.image}></button>
                            <button className={styles.image}></button>
                        </>
                    }
                    {createImageURL.map((item, i) => {
                        return (
                            image[i].name.includes('.png') || image[i].name.includes('.jpg') || image[i].name.includes('.jpeg')
                                ?
                                <>
                                    <div className={styles.close} onClick={() => removeImage(i)}>×</div>
                                    <Image src={item} width={184} height={184} alt={`画像${i}`} ref={ref[i]} className={styles.image} />
                                </>
                                :
                                <>
                                    <div className={styles.close} onClick={() => removeImage(i)}>×</div>
                                    <video src={item} width={184} height={184} ref={ref[i]} className={styles.image} muted autoplay />
                                    <div className={styles.playIcon} onClick={() => videoPlay(i)}>▶</div>
                                </>
                        )
                    })}
                </div>
            </div>
            <div className={styles.nextButtonDiv}>
                <button className={styles.backButton} onClick={() => backButton()}><span className={styles.allow}>◀</span><span className={styles.nextButtonText}>１つ戻る</span></button>
                <button className={styles.nextButton} onClick={() => nextButton()}><span className={styles.nextButtonText}>次の項目へ</span><span className={styles.allow}>▶</span></button>
            </div>
        </div>
    )
}