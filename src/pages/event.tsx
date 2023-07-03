import SubHeader from "../components/subheader";
import Style from '../styles/Event.module.css';
import Image from 'next/image';
export default function Event() {
    return (
        <div>
            <SubHeader />
            <div className={Style.container}>
                <p className={Style.title}>IRでのお得な情報を発信しています！通常のクーポンもあるのでお見逃しなく♪</p>
                <p className={Style.english}>special feature</p>
                <p className={Style.japanese}>特集</p>
                <div className={Style.flex}>
                    <Image className={Style.image}
                        src = {"/image/special feature.jpg"}
                        width = {240} height = {140} alt='イベント'
                        />
                    <Image className={Style.image}
                        src = {"/image/special feature2.jpg"}
                        width = {240} height = {140} alt='イベント'
                        />
                    <Image className={Style.image}
                        src = {"/image/special feature3.png"}
                        width = {240} height = {140} alt='イベント'
                        />
                    <Image className={Style.image}
                        src = {"/image/special feature4.jpg"}
                        width = {240} height = {140} alt='イベント'
                        />
                </div>

                <p className={Style.english}>event</p>
                <p className={Style.japanese}>イベント</p>
                <div className={Style.flex}>
                    <Image className={Style.image}
                        src = {"/image/event.png"}
                        width = {240} height = {140} alt='イベント'
                        />

                    <Image className={Style.image}
                        src = {"/image/event2.png"}
                        width = {240} height = {140} alt='イベント'
                        />

                    <Image className={Style.image}
                        src = {"/image/event3.png"}
                        width = {240} height = {140} alt='イベント'
                        />
                </div>
                <p className={Style.english}>coupon</p>
                <p className={Style.japanese}>クーポン</p>
                <div className={Style.flex}>
                    <Image className={Style.image}
                        src = {"/image/Coupon.jpg"}
                        width = {240} height = {140} alt='クーポン'
                        />
                   
                    <Image className={Style.image}
                        src = {"/image/Coupon2.jpg"}
                        width = {240} height = {140} alt='クーポン'
                        />
                </div>
            </div>
        </div>
    )
}