import Link from "next/link";

export default function DrawerMenu(){

    return (
        <>
            <div>
                <ul>
                    <li>
                        <a href="/coment.tsx">口コミ</a>
                    </li>
                    <li>
                        <a href="/post.tsx">投稿する</a>
                    </li>
                    <li>
                        <a href="/account.tsx">アカウント</a>
                    </li>
                    <li>
                        <a href="/event.tsx">イベント・ニュース</a>
                    </li>
                    <li>
                        <a href="/connect.tsx">つながる</a>
                    </li>
                </ul>
            </div>
        </>
    )
}
