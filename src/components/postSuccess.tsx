import { useRouter } from 'react'

export default function postSuccess() {
    const router = useRouter()
    const toHome = () => {
        router.push("/")
    }
    return (
        <>
            投稿が完了しました
            <button onClick={() => toHome()}>ホームへ</button>
        </>
    )
}