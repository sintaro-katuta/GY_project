// Firebaseの初期化を行うためfirebaseAppをインポート
import { db } from '../lib/firebase.config';
import Header from "../components/header";
import Footer from "../components/footer";
import { collection, doc, getDocs, where, query } from "firebase/firestore";
import { useState, useEffect } from 'react'
import NextImage from 'next/image';
import Style from '../styles/Album.module.css';

export default function Album() {
    const [list, setList] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let newList: any = [];
            let newCategory: any = {}
            newCategory['all'] = 0
            newCategory['shop'] = 0
            newCategory['food'] = 0
            newCategory['casino'] = 0
            newCategory['hotel'] = 0
            const posts = collection(db, "posts")
            const snapShot = await getDocs(posts)
            let num: number = 0
            snapShot.docs.map((doc: any, i: number) => {
                const imageNum = doc.data().image.length
                for (let j = 0; j < imageNum; j++) {
                    newList[num] = doc.data().image[j]
                    num++;
                }
                const category = doc.data().category
                newCategory['all'] = newCategory['all'] + imageNum
                category.forEach((e: any) => {
                    if (e === 'ショップ') {
                        newCategory['shop'] = newCategory['shop'] + imageNum
                    } else if (e === 'グルメ') {
                        newCategory['food'] = newCategory['food'] + imageNum
                    } else if (e === 'カジノ') {
                        newCategory['casino'] = newCategory['casino'] + imageNum
                    } else if (e === '宿泊') {
                        newCategory['hotel'] = newCategory['hotel'] + imageNum
                    }
                })
            });
            setList(newList)
            setCategory(newCategory)
        }
        fetchData()
    }, [])

    const filterData = async (target: string) => {
        const posts = collection(db, "posts");
        const q = await query(posts, where("category", "array-contains-any", [target]))
        const postsSnapShot = await getDocs(q)
        let newList: any = []
        let num: number = 0
        postsSnapShot.docs.map((doc: any) => {
            if (doc.exists()) {
                for (let i = 0; i < doc.data().image.length; i++) {
                    newList[num] = doc.data().image[i]
                    num++;
                }
            }
        })
        setList(newList)
    }

    const allData = async () => {
        const posts = collection(db, "posts")
        const snapShot = await getDocs(posts)
        let num: number = 0
        let newList: any = []
        snapShot.docs.map((doc: any, i: number) => {
            const imageNum = doc.data().image.length
            for (let j = 0; j < imageNum; j++) {
                newList[num] = doc.data().image[j]
                num++;
            }
        })
        setList(newList)
    }

    return (
        <div>
            {console.log("list", list)}
            <Header />
            <p className={Style.atitle}>みんなの投稿した写真が見れます。　IRの雰囲気をみんなに伝えてみよう！</p>
            <div className={Style.abution}>
                <p className={Style.p} onClick={() => allData()}>全て({category['all']})</p>
                <p className={Style.p} onClick={() => filterData("ショップ")}>ショップ({category['shop']})</p>
                <p className={Style.p} onClick={() => filterData("グルメ")}>グルメ({category['food']})</p>
                <p className={Style.p} onClick={() => filterData("カジノ")}>カジノ({category['casino']})</p>
                <p className={Style.p} onClick={() => filterData("宿泊")}>宿泊({category['hotel']})</p>
            </div>

            <div className={Style.album}>
                {list.map((item: any, i: number) => {
                    return (
                        <>
                            {item.includes('.png') || item.includes('.jpg') || item.includes('.jpeg')
                                ?
                                <div key={i}>
                                    <NextImage className={Style.albumImage} src={item} width={275} height={275} alt={"みんなのアルバム"} />
                                </div>
                                :
                                <div key={i}>
                                    <video className={Style.play} controls src={item} width={275} height={275} />
                                </div>
                            }
                        </>
                    )
                })}
            </div>
            <Footer />
        </div>
    )
}