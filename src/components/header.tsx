import Drawer from '@mui/material/Drawer';
import DrawerMenu from './drawermenu';
import { useState } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import Style from '../styles/Header.module.css';

export default function Header() {
    const router = useRouter();
    const paths = decodeURI(router.asPath).substring(1).split("/");
    const roots = [""];
    for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);
    // drawerがopenしているかどうかのstate
    const [drawerOpened, setDrawerOpened] = useState(false);
    const auth = getAuth()

    const toPost = () => {
        router.push("/post")
    }

    const signout = async () => {
        signOut(auth)
    }
    return (
        <header className={Style.container}>
            <div className={Style.title}>
                <p >~思い出巡る・心繋がる~</p>
                <p>IRでの体験や思い出を共有するSNSサービス</p>
            </div>
            <div className={Style.list}>
                <Link href={"http://localhost:8888"}>リゾートサイトへ</Link><br />
                <Link href="/">Top</Link>
                {paths.map((x, i) => {
                    return (
                        <Link href={roots[i + 1]} key={i}>
                            {">" + x}
                        </Link>
                    )
                })}
                <ul className={Style.ul}>
                    <li>
                        <Link href={"/memories"} className={Style.li}>
                            みんなの思い出
                        </Link>
                    </li>
                    <li>
                        <Link href={"/album"} className={Style.li}>
                            みんなのアルバム
                        </Link>
                    </li>
                    <li>
                        <Link href={"/connect"} className={Style.li}>
                            繋がる
                        </Link>
                    </li>
                    <li>
                        <Link href={"/event"} className={Style.li}>
                            特集・イベント
                        </Link>
                    </li>
                    <li>
                        <Link href={"/account"} className={Style.li}>
                            アカウント
                        </Link>
                    </li>
                </ul>
                <button className={Style.contribution} onClick={() => toPost()}>投稿する</button>
                {/* <button onClick={() => signout()}>サインアウト</button> */}
            </div>
            {/* <Image
                src={"/image/hamburger.svg"}
                height={20} width={20} alt='ハンバーガー'
                onClick={() => setDrawerOpened(true)}
            />
            <Drawer
                anchor={'left'}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                PaperProps={{ style: { width: '70%' } }}>
                <DrawerMenu />
            </Drawer> */}

            <Image className={Style.top}
            src = {"/image/top.png"}
            width = {360} height = {126} alt='トップ'
            />

            <Image className={Style.icon}
            src = {"/image/Group 53.png" }
            width = {360} height = {126} alt='アイコン'
            />
            <Image className={Style.header}
            src = {"/image/header.png" }
            width = {360} height = {126} alt='ヘッダー'
            />
            <div className={Style.div}>
                
            </div>
        </header>
    )
}