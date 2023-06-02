// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react'
import NextImage from 'next/image';


export default function Memories() {
    const db = getFirestore(firebaseApp)
    const [list, setList] = useState([])
    const [list2, setList2] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const ref = collection(db, "posts")
            const snapShot = await getDocs(ref)
            const list = snapShot.docs.map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            const ref2 = collection(db, "posts_images")
            const snapShot2 = await getDocs(ref2)
            const list2 = snapShot2.docs.map((doc2) => {
                const item = doc2.data()
                item.id = doc2.id
                return item
            })
            setList(list)
            setList2(list2)
        }
        fetchData()
    }, [])
    return (
        <div>
            <Header />
            <h1 onClick={() => console.log(list)}>みんなの思い出</h1>
            {list.map((item, i) => {
                return (
                    <div key={i}>
                        <h3>{item.user}</h3>
                        <p>{item.comment}</p>
                        {list2.map((item2, j) => {
                            if (item.id === item2.post_id) {
                                return (
                                    <NextImage key={j} alt={`画像${i}`} src={item2.image} width={120} height={120} />
                                )
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}