import Header from "../components/header";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../components/footer";

export default function Index() {
    return (
        <div>
            <Header />
            <Footer />
        </div>
    )
}