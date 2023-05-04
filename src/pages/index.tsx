import { useRouter } from "next/router";
import { useLocale } from "../hooks/useLocal";
import Header from "../components/header";
import Link from "next/link";

export default function Index(){
    const { t } = useLocale()
    return(
        <div>
            <Header/>
            {t.HELLO}
        </div>
    )
}