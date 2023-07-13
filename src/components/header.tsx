import { useRef, useEffect } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";
import Style from '../styles/Header.module.css';

export default function Header() {
    const router = useRouter();
    const ref = useRef(null)
    const paths = decodeURI(router.asPath).substring(1).split("/");
    const roots = [""];
    for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);
    useEffect(() => {
        let memory: any = document.getElementById("memories");
        let album: any = document.getElementById("album");

        if (paths[0] == "memories") {
            memory.style.listStyle = "disc";
        } else if (paths[0] == "album") {
            album.style.listStyle = "disc";
        }
    }, [paths])

    const toPost = () => {
        router.push("/post")
    }

    return (
        <header className={Style.container}>
            <div className={Style.title}>
                <p>~思い出巡る・心繋がる~</p>
                <p>IRでの体験や思い出を共有するSNSサービス</p>
            </div>
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
                <button className={Style.contribution} onClick={() => toPost()}>投稿する</button>
            </div>

            <Link href={"https://gyproject-66748.web.app/"}>
                <Image className={Style.top}
                    src={"/image/top.png"}
                    width={360} height={126} alt='トップ'
                />
            </Link>

            <Image className={Style.icon}
                src={"/image/Group 53.png"}
                width={360} height={126} alt='アイコン'
            />
            <Image className={Style.header}
                src={"/image/header.png"}
                width={360} height={126} alt='ヘッダー'
            />
            <div className={Style.div} />
        </header>
    )
}