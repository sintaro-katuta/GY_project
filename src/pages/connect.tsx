import { db } from '../lib/firebase.config';
import SubHeader from "../components/subheader";
import { useEffect } from "react"
import { collection, getDocs } from "firebase/firestore";

export default function Connect() {
    useEffect(() => {
        (async () => {
            const posts = collection(db, "posts")
            const postsSnapShot = await getDocs(posts)
            const newPostList = postsSnapShot.docs.map((doc: any) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            console.log(newPostList)
        })()
    }, [])
    return (
        <div>
            <SubHeader />
            <h1>繋がる</h1>

        </div>
    )
}