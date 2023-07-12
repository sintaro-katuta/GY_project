import Image from 'next/image'
import styles from '../styles/Post.module.css'
import { useState } from 'react'

export default function SelectImage({ handleVisible, handleImage }: any) {
    const [image, setImage]: any = useState([])
    const [createImageURL, setCreateImageURL]: any = useState([])
    const [ErrorMessage, setErrorMessage]: any = useState("")
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
            setErrorMessage("")
            let newImage: any = [...image]
            let newInputImage: any = [...e.target.files]
            let list: any = [...createImageURL]
            let j = 0;
            let totalSize = 0
            const total = newImage.length + newInputImage.length
            for (let i = newImage.length; i < total; i++) {
                newImage[i] = newInputImage[j]
                j++;
            }
            for (let i = 0; i < newImage.length; i++) {
                totalSize = totalSize + newImage[i].size
                if (newImage[i].type !== "image/jpeg" && newImage[i].type !== "image/png" && newImage[i].type !== "image/jpg" && newImage[i].type !== "video/quicktime" && newImage[i].type !== "video/mp4") {
                    i = newImage.length
                    setErrorMessage("画像・動画以外のファイルが選択されています")
                    newImage = image
                }
            }
            if (total > maxUpload) {
                setErrorMessage("画像・動画は４つまで投稿できます")
                newImage = image
            } else if (totalSize >= maxSize) {
                setErrorMessage("画像・動画サイズの上限を超えています")
                newImage = image
            }
            for (let i = 0; i < newImage.length; i++) {
                const imageUrl = URL.createObjectURL(newImage[i])
                list[i] = imageUrl
            }
            setImage(newImage)
            setCreateImageURL(list)
            e.target.value = ""
        }
    }

    const removeImage = (i: number) => {
        // 選択した画像は削除可能
        const newImages = [...image];
        const newUrl = [...createImageURL]
        newImages.splice(i, 1);
        newUrl.splice(i, 1);
        setErrorMessage("")
        setImage(newImages);
        setCreateImageURL(newUrl)
    }

    const backButton = () => {
        const newVisibleList = [true, false, false, false, false]
        handleVisible(newVisibleList)
    }

    const nextButton = () => {
        if (image.length <= 0) {
            setErrorMessage("一つ以上選択してください")
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
                <p className={styles.themeText}>次に投稿する写真を選択しましょう！※最大1MB <small>クリックすると削除できます</small></p>
                <p className={styles.error}>{ErrorMessage}</p>
                <label htmlFor="file" className={styles.imageLabel}>
                    <input type="file" id="file" multiple accept="image/jpeg, image/png, image/gif, video/mp4, video/avi, video/quicktime" onChange={(e) => addImage(e)} className={styles.imageFile} />
                </label>
                <div className={styles.imageDiv}>
                    {createImageURL.length <= 0 &&
                        <>
                            <button className={styles.image}></button>
                            <button className={styles.image}></button>
                            <button className={styles.image}></button>
                            <button className={styles.image}></button>
                        </>
                    }
                    {createImageURL.map((item: any, i: any) => {
                        return (
                            image[i].name.includes('.png') || image[i].name.includes('.jpg') || image[i].name.includes('.jpeg')
                                ?
                                <>
                                    <Image src={item} width={184} height={184} alt="投稿する画像" className={styles.image} onClick={() => removeImage(i)} />
                                </>
                                :
                                <>
                                    <video src={item} width={184} height={184} className={styles.image} controls onClick={() => removeImage(i)} />
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