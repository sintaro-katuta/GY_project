import Link from "next/link";
import { useLocale } from "../hooks/useLocal";

export default function DrawerMenu(){
    const { t } = useLocale()
    return (
        <>
            <div>
                {t.CHANGE_LANGUAGE}<br />
                <Link href="/" locale="ja">
                    日本語
                </Link>
                <br />
                <Link href="/" locale="en">
                    English
                </Link>
                <br />
                <Link href="/" locale="kr">
                    한국어
                </Link>
            </div>
        </>
    )
}
