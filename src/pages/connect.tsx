import { db } from '../lib/firebase.config';
import SubHeader from "../components/subheader";
import styles from "../styles/Connect.module.css"
import { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc, updateDoc, arrayUnion, } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router";
import Image from 'next/image';
import Bar from '../components/bar'

export default function Connect() {
    const [postData, setPostdata]: any = useState([])
    const [clear, setClear]: any = useState([])
    const [clearFlag, setClearFlag]: any = useState(false)
    const [errorMessage, setErrorMessage]: any = useState("")
    const [hover, setHover]: any = useState(false)
    const [currentUser, setCurrentUser]: any = useState([])
    const [clicked, setClicked]: any = useState(false)
    const [imageDetail, setImageDetail]: any = useState("")
    const [selectIndex, setSelectIndex]: any = useState()
    const [images, setImages]: any = useState(["/image/Card.svg", "/image/Card.svg", "/image/Card.svg", "/image/Card.svg", "/image/Card.svg", "/image/Card.svg", "/image/Card.svg", "/image/Card.svg"])
    const [couponImages, setCouponImages]: any = useState(["/image/Coupon.svg", "/image/Coupon2.svg", "/image/Coupon3.svg", "/image/Coupon4.svg", "/image/Coupon5.svg", "/image/Coupon6.svg", "/image/Coupon7.svg", "/image/Coupon8.svg"])
    const images2 = ["/image/Card2.svg", "/image/Card2.svg", "/image/Card2.svg", "/image/Card2.svg", "/image/Card2.svg", "/image/Card2.svg", "/image/Card2.svg", "/image/Card2.svg"];

    const router = useRouter();
    const toPost = () => {
        router.push("/post")
    }

    // firebase関連
    const auth = getAuth()

    useEffect(() => {
        // ログイン状態をウォッチ
        let unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                // ユーザ情報を格納する
                setCurrentUser(user)
            }
            unsubscribe()
        })
    }, [auth])

    useEffect(() => {
        (async () => {
            const posts: any = collection(db, "posts")
            const postsSnapShot: any = await getDocs(posts)
            const newPostList: any = postsSnapShot.docs.map((doc: any) => {
                const item = doc.data()
                return item
            })
            const connect: any = collection(db, "connect")
            const connectDoc: any = await doc(connect, "aoc3SSKRohVxhyg2HSpo")
            const connectSnapShot: any = await getDoc(connectDoc)
            const point: any = connectSnapShot.data().point
            const totalPost: any = newPostList
            if (point - totalPost < 0) {
                setClearFlag(true)
            } else {
                // falus
                setClearFlag(true)
            }
            setPostdata(totalPost)
            setClear(point)
        })()
    }, [currentUser.uid])

    const imagesClick = async (e: any, i: any) => {
        if (clicked == false) {
            const user = collection(db, "users")
            const userDoc = await doc(user, currentUser.uid)
            const userGetDoc = await getDoc(userDoc)
            const userData = await userGetDoc.data()
            if (!userData.treasure) {
                const newCouponImages = couponImages
                for (let i = newCouponImages.length - 1; i >= 0; i--) {
                    let rand = Math.floor(Math.random() * (i + 1))
                    // 配列の要素の順番を入れ替える
                    let tmpStorage = newCouponImages[i]
                    newCouponImages[i] = newCouponImages[rand]
                    newCouponImages[rand] = tmpStorage
                }
                setCouponImages(newCouponImages)
                setClicked(!clicked)
                await updateDoc(userDoc, {
                    treasure: arrayUnion(newCouponImages[i])
                })
                e.target.className = styles.changed
            } else {
                setErrorMessage("既に獲得しています")
            }
        }
    }

    const detailImage = (i: any) => {
        setSelectIndex(i)
        const selectImage = couponImages[i]
        const newCouponImages = couponImages
        for (let j = 0; j < newCouponImages.length; j++) {
            newCouponImages[j] = "/image/Card2.svg"
        }
        setImages(newCouponImages)
        setImageDetail(selectImage)
    }

    const closeDetail = () => {
        const newCouponImages = couponImages
        for (let j = 0; j < newCouponImages.length; j++) {
            newCouponImages[j] = "/image/Card.svg"
        }
        newCouponImages[selectIndex] = imageDetail
        setImageDetail(null)
        setImages(newCouponImages)
    }

    const treasure = async () => {
        setErrorMessage("")
        const user = collection(db, "users")
        const userDoc = await doc(user, currentUser.uid)
        const userGetDoc = await getDoc(userDoc)
        const userData = await userGetDoc.data()
        if (userData.treasure) {
            setImageDetail(`${userData.treasure}`)
        }
    }
    return (
        <div className={styles.container}>
            <SubHeader />
            <div>
                <p className={styles.p}>CARDGAME</p>
                <p className={styles.p_co}>みんなの投稿でIRで使えるスペシャルなお宝をGETしましょう！</p>
                <p className={styles.error}>{errorMessage}</p>
                <div className={styles.p_to}>
                    <p className={styles.p1}>全体の投稿数</p>
                    <p className={styles.p}>{postData.length}</p>
                    {hover
                        ?
                        <Image className={styles.takara} src={"/image/Group 253.svg"} width={30} height={30} alt='bottomright' onMouseOver={() => setHover(false)} onMouseLeave={() => setHover(false)} onClick={() => treasure()} />
                        :
                        <Image className={styles.takara} src={"/image/Takara.svg"} width={30} height={30} alt='bottomright' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(true)} />
                    }
                </div>
                {imageDetail &&
                    <div className={styles.selectImageDiv}>
                        <div className={styles.leftContent}>
                            {imageDetail.includes("Coupon.svg") && <p className={styles.selectImageText}>ケーキ無料券<br />IRにあるカフェでケーキと交換しよう！</p>}
                            {imageDetail.includes("Coupon2.svg") && <p className={styles.selectImageText}>アイスクリーム無料券<br /><br />IRにあるカフェでアイスクリームと交換しよう！</p>}
                            {imageDetail.includes("Coupon3.svg") && <p className={styles.selectImageText}>コーヒー無料券<br /><br />IRにあるカフェでコーヒーと交換しよう！</p>}
                            {imageDetail.includes("Coupon4.svg") && <p className={styles.selectImageText}>フライドポテト無料券<br /><br />IRにあるファストフード店でフライドポテトと交換しよう！</p>}
                            {imageDetail.includes("Coupon5.svg") && <p className={styles.selectImageText}>お好きなジュース無料券<br /><br />IRにあるファストフード店でジュースと交換しよう！</p>}
                            {imageDetail.includes("Coupon6.svg") && <p className={styles.selectImageText}>うどん無料券<br /><br />IRにあるファミリーレストランでうどんと交換しよう！</p>}
                            {imageDetail.includes("Coupon7.svg") && <p className={styles.selectImageText}>国内旅行プレゼント<br /><br />IRのインフォメーションにて交換しよう！</p>}
                            {imageDetail.includes("Coupon8.svg") && <p className={styles.selectImageText}>お土産5%OFFクーポン<br /><br />IRにあるお土産屋で全品5%オフ！</p>}
                            <p className={styles.selectImageText}>※スクリーンショットや写真を取り、店舗で提示してください。</p>
                        </div>
                        <div className={styles.rightContent}>
                            <Image src={imageDetail} width={276} height={418} className={styles.selectImage}></Image>
                        </div>
                        <div className={styles.close} onClick={() => closeDetail()}></div>
                    </div>
                }
                {clearFlag
                    ?
                    <>
                        <div className={styles.card}>
                            {images.map((fruit, i) => <Image className={styles.images} key={i} src={fruit} width={115} height={200} alt='images' onClick={(e: any) => imagesClick(e, i)} />)}
                        </div>
                        {couponImages &&
                            <div className={styles.card}>
                                {couponImages.map((fruit: any, i: any) => <Image className={styles.back} key={i} src={fruit} width={115} height={200} alt='images' onClick={() => detailImage(i)} />)}
                            </div>
                        }
                    </>
                    :
                    <>
                        <Bar data={postData.length} data2={clear} />
                        <div className={styles.card}>
                            {images2.map((fruit, i) => <Image className={styles.images} key={i} src={fruit} width={115} height={200} alt='images' />)}
                        </div>
                    </>
                }
                <div className={styles.toPostDiv}>
                    <div className={styles.toPostContent}>
                        <a onClick={() => toPost()}>投稿しにいく</a>
                    </div>
                    <div className={styles.toPostContent}>
                        <Image src={"/image/Ya.svg"} width={23} height={23} alt='bottomright' />
                    </div>
                </div>
            </div>
        </div>
    )
}