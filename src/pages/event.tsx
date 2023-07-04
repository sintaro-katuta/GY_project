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
                    <div>
                        <Image className={Style.image}
                            src = {"/image/special feature.jpg"}
                            width = {240} height = {140} alt='イベント'
                            />
                        <h5 className={Style.h5}>新たなアトラクションやエリアの特集。<br/>
                        最新のテクノロジーを駆使した...<br/>
                        </h5>
                    </div>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/special feature2.jpg"}
                            width = {240} height = {140} alt='イベント'
                            />
                           <h5 className={Style.h5}>テーマパーク内の美味しい食べ物や特別<br/>
                           なイベントに焦点を当てた特集...<br/>
                           </h5> 
                    </div>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/special feature3.png"}
                            width = {240} height = {140} alt='イベント'
                            />
                            <h5 className={Style.h5}>テーマパークで人気のキャラクター<br/>
                            やショーにスポットを当てた特集...<br/>
                           </h5> 
                    </div>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/special feature4.jpg"}
                            width = {240} height = {140} alt='イベント'
                            />
                        <h5 className={Style.h5}>家族連れにおすすめの特集。<br/>
                        子供向けのアトラクションやイベント...<br/>
                        </h5> 
                    </div>
                </div>

                <p className={Style.english}>event</p>
                <p className={Style.japanese}>イベント</p>
                <div className={Style.flex}>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/event.png"}
                            width = {240} height = {140} alt='イベント'
                            />
                        <h5 className={Style.h5}>カジノ内で開催されるポーカート<br/>
                        ーナメントイベント。参加者...<br/>
                        </h5> 
                    </div>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/event2.png"}
                            width = {240} height = {140} alt='イベント'
                            />
                        <h5 className={Style.h5}>ホテル内のレストランが一堂に会し、<br/>
                        様々な料理やグルメ体験が楽し...<br/>
                        </h5> 
                    </div>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/event3.png"}
                            width = {240} height = {140} alt='イベント'
                            />
                        <h5 className={Style.h5}>ブラックジャック、ルーレット、バカラなど<br/>
                        の人気テーブルゲームを対象にした...<br/>
                        </h5> 
                    </div>
                </div>
                <p className={Style.english}>coupon</p>
                <p className={Style.japanese}>クーポン</p>
                <div className={Style.flex}>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/Coupon.jpg"}
                            width = {240} height = {140} alt='クーポン'
                            />
                        <h5 className={Style.h5}>エンチャンテッド・ビストロ<br/>
                        提供内容: ランチタイムに限り、特別な...<br/>
                        有効期間: 2023年12月31日まで
                        </h5>
                    </div>
                    <div>
                        <Image className={Style.image}
                            src = {"/image/Coupon2.jpg"}
                            width = {240} height = {140} alt='クーポン'
                            />
                        <h5 className={Style.h5}>フレンチ・ルネッサンス<br/>
                        提供内容: ディナータイムに限り、コース料...<br/>
                        有効期間: 2023年10月1日から...
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}