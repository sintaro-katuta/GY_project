// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect, useRef, createRef } from 'react'
import NextImage from 'next/image';

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
            <h1>みんなのアルバム</h1>
            <ul style={{ display: "flex", listStyle: "none" }}>
                {list.map((item: any, i: number) => {
                    return (
                        Object.keys(item).map((key) => {
                            return (
                                <li key={key}>
                                    {item[key].includes('.png') || item[key].includes('.jpg') || item[key].includes('.jpeg')
                                        ?
                                        <div>
                                            <NextImage src={item[key]} width={275} height={275} alt={"みんなのアルバム"} ref={ref[i]} />
                                        </div>
                                        :
                                        <div>
                                            <video src={item[key]} width={275} height={275} ref={ref[i]} />
                                            <button onClick={() => videoPlay(i)}>再生</button>
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