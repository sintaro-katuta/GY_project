// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react'
import NextImage from 'next/image';

export default function Album() {
    const db = getFirestore(firebaseApp)
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const ref = collection(db, "posts_images")
            const snapShot = await getDocs(ref)
            const list = snapShot.docs.map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            setList(list)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Header />
            <h1>みんなのアルバム</h1>
            <ul style={{ display: "flex", listStyle: "none" }}>
                {list.map((item, i) => {
                    return (
                        <li key={i}>
                            <NextImage alt="みんなのアルバム" src={item.image} width={235} height={235} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}