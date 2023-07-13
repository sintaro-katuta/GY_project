import Drawer from '@mui/material/Drawer';
import DrawerMenu from './drawermenu';
import { useState, useRef, useEffect } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import Style from '../styles/SubHeader.module.css';

export default function SubHeader() {
    const router = useRouter();
    const ref = useRef(null)
    const paths = decodeURI(router.asPath).substring(1).split("/");
    const roots = [""];
    for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);
    // drawerがopenしているかどうかのstate
    const [drawerOpened, setDrawerOpened] = useState(false);
    const auth = getAuth()

    useEffect(() => {
        let connect: any = document.getElementById("connect");
        let event: any = document.getElementById("event");
        let account: any = document.getElementById("account");

        if (paths[0] == "connect") {
            connect.style.listStyle = "disc";
        } else if (paths[0] == "event") {
            event.style.listStyle = "disc";
        } else if (paths[0] == "account") {
            account.style.listStyle = "disc";
        }
    }, [paths])

    return (
        <header className={Style.container}>
            <div className={Style.list}>
                <ul className={Style.ul_memories} id="memories" ref={ref}>
                    <li>
                        <Link href={"/memories"} className={Style.li_memories}>
                            みんなの思い出
                        </Link>
                    </li>
                </ul>
                <ul className={Style.ul_album} id="album">
                    <li>
                        <Link href={"/album"} className={Style.li_album}>
                            みんなのアルバム
                        </Link>
                    </li>
                </ul>
                <ul className={Style.ul_connect} id="connect">
                    <li>
                        <Link href={"/connect"} className={Style.li_connect}>
                            繋がる
                        </Link>
                    </li>
                </ul>
                <ul className={Style.ul_event} id="event">
                    <li>
                        <Link href={"/event"} className={Style.li_event}>
                            特集・イベント
                        </Link>
                    </li>
                </ul>
                <ul className={Style.ul_account} id="account">
                    <li>
                        <Link href={"/account"} className={Style.li_account}>
                            <Image className={Style.account_image}
                                src={"/image/Account.png"}
                                width={20} height={20} alt='アカウント'
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}