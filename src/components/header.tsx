import Drawer from '@mui/material/Drawer';
import DrawerMenu from './drawermenu';
import { useState } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";

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
        <>
            <header>
                <p>ヘッダー</p>
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

                <Link href={"http://localhost:8888"}>リゾートサイトへ</Link><br />
                <Link href="/">Top</Link>
                {paths.map((x, i) => {
                    return (
                        <Link href={roots[i + 1]} key={i}>
                            {">" + x}
                        </Link>
                    )
                })}
                <ul>
                    <li>
                        <Link href={"/memories"}>
                            みんなの思い出
                        </Link>
                    </li>
                    <li>
                        <Link href={"/album"}>
                            みんなのアルバム
                        </Link>
                    </li>
                    <li>
                        <Link href={"/connect"}>
                            繋がる
                        </Link>
                    </li>
                    <li>
                        <Link href={"/event"}>
                            特集・イベント
                        </Link>
                    </li>
                    <li>
                        <Link href={"/account"}>
                            アカウント
                        </Link>
                    </li>
                </ul>
                <button onClick={() => toPost()}>投稿する</button>
                <button onClick={() => signout()}>サインアウト</button>
            </header>
        </>
    )
}