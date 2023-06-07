// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react'
import NextImage from 'next/image';


export default function Memories() {
    const [list, setList] = useState([])
    const [list2, setList2] = useState([])
    const [list3, setList3] = useState([])
    const [user, setUser] = useState([])
    let newUser: any[] = []

    useEffect(() => {
        (async () => {
            const ref = collection(db, "posts")
            const snapShot = await getDocs(ref)
            const newlist = snapShot.docs.map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            const ref2 = collection(db, "posts_images")
            const snapShot2 = await getDocs(ref2)
            const newlist2 = snapShot2.docs.map((doc2) => {
                const item = doc2.data()
                item.id = doc2.id
                return item
            })

            const users = collection(db, "users")
            for (let i = 0; i < newlist.length; i++) {
                console.log(i, "回目:", newlist[i].user)
                const usersdoc = doc(users, newlist[i].user)
                const docRef = getDoc(usersdoc)
                await docRef.then((value) => {
                    if (value.exists()) {
                        const item = value.data()
                        newUser.push(item)
                    }
                })
            }
            setList(newlist)
            setList2(newlist2)
            setUser(newUser)
        })()
    }, [])

    return (
        <div>
            <Header />
            {console.log("list", list)}
            <h1>みんなの思い出</h1>
            {list.map((item, i) => {
                return (
                    <div key={i}>
                        <p>------------------------------</p>
                        <p>{user[i].name}</p>
                        <p>{item.comment}</p>
                        {
                            list2.map((item2, j) => {
                                if (item.id === item2.post_id) {
                                    return (
                                        <NextImage key={j} alt={`画像${i}`} src={item2.image} width={120} height={120} />
                                    )
                                }
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}