import Link from "next/link";

export default function account(){
    return(
        <>
            <h1>アカウント</h1>
            <Link href={"/account/signUp"}>
                新規登録
            </Link>
            <br />
            <Link href={"/account/login"}>
                ログイン
            </Link>
        </>
    )
}