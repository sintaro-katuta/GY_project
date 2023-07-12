import Link from "next/link";

export default function DrawerMenu(){

    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link href={"/comment"}>
                            口コミ
                        </Link>
                    </li>
                    <li>
                        <Link href={"/post"}>
                            投稿
                        </Link>
                    </li>
                    <li>
                        <Link href={"/account"}>
                            アカウント
                        </Link>
                    </li>
                    <li>
                        <Link href={"/event"}>
                            イベント
                        </Link>
                    </li>
                    <li>
                        <Link href={"/connect"}>
                            つながる
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
