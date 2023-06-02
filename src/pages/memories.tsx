// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp, db } from '../lib/firebase.config';
import Header from "../components/header";
import { collection, doc, getDoc } from "firebase/firestore";

export default function Memories() {
    return (
        <div>
            <Header />
            <h1>みんなの思い出</h1>
        </div>
    )
}