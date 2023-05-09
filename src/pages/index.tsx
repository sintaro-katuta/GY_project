import { useRouter } from "next/router";
import { useLocale } from "../hooks/useLocal";
import Header from "../components/header";
import Link from "next/link";
console.log(process.env.NEXT_PUBLIC_TEST)
export default function Index(){
    const { t } = useLocale()
    return(
        <div>
            <Header/>
            {t.HELLO}
            {process.env.NEXT_PUBLIC_TEST}
        </div>
    )
}