// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect, useRef, createRef } from 'react'
import NextImage from 'next/image';
import Style from '../styles/Album.module.css';

export default function Album() {
    const db = getFirestore(firebaseApp)
    const [list, setList] = useState([]);
    const ref = useRef([])

    useEffect(() => {
        const fetchData = async () => {
            // const ref = collection(db, "posts_images")
            // const snapShot = await getDocs(ref)
            // const newList = snapShot.docs.map((doc) => {
            //     const item = doc.data().image
            //     return item
            // })
            const newList = [
                { 0: "/image/カジノ１.jpg" },
                { 0: "/image/test.mov" }
            ]
            setList(newList)
        }
        fetchData()
    }, [])

    list.forEach((_: any, index: number) => {
        ref[index] = createRef()
    });

    const videoPlay = (e: number) => {
        ref[e].current.play()
    }

    return (
        <div>
            <Header />
            <p className={Style.atitle}>みんなの投稿した写真が見れます。　IRの雰囲気をみんなに伝えてみよう！</p>
            <div className={Style.abution}>
                <p className={Style.p}>全て</p>
                <p className={Style.p}>ショップ</p>
                <p className={Style.p}>グルメ</p>
                <p className={Style.p}>カジノ</p>
                <p className={Style.p}>宿泊</p>
            </div>

            <ul className={Style.album}>
                 {list.map((item: any, i: number) => {
                    return (
                        Object.keys(item).map((key) => {
                            return (
                                <li key={key}>
                                    {item[key].includes('.png') || item[key].includes('.jpg') || item[key].includes('.jpeg')
                                        ?
                                        <div>
                                            <NextImage className={Style.image} src={item[key]} width={275} height={275} alt={"みんなのアルバム"} ref={ref[i]} />
                                        </div>
                                        :
                                        <div>
                                            <video className={Style.play} controls src={item[key]} width={275} height={275} ref={ref[i]} />
                                        </div>
                                    }
                                </li>
                            )
                        })
                    )
                })}
            </ul>
        </div>
    )
}