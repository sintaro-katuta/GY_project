import { useRouter } from "next/router";
import { useLocale } from "../hooks/useLocal";
import Link from "next/link";

export default function Index(){
    const { locale, locales, asPath } = useRouter()
    const { t } = useLocale()

    return(
        <div>
            {t.HELLO}
            <br />
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
    )
}