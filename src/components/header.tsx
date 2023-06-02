import Drawer from '@mui/material/Drawer';
import DrawerMenu from './drawermenu';
import { useState } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
    // drawerがopenしているかどうかのstate
    const [drawerOpened, setDrawerOpened] = useState(false);
    const router = useRouter()
    const auth = getAuth()

    const toPost = () => {
        console.log(auth)
        router.push("/post")
    }

    const signout = async () => {
        signOut(auth)
        console.log("aa")
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

                <Link href={"http://localhost:8888"}>リゾートサイトへ</Link>
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