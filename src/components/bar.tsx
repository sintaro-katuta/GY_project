import Style from '../styles/Bar.module.css';
import Image from 'next/image';

export default function Bar(data: any) {
    return (
        <>
            <div>
                <div className={Style.div}>
                    <p className={Style.data}>現 在 :  {data.data} 投 稿</p>
                    <Image className={Style.key} src={"/image/Key.svg"} width={15} height={15} alt='bottomright' />
                </div>
                <Image className={Style.qu} src={"/image/QQ.svg"} width={161} height={124} alt='bottomright' />
                <meter className={Style.meter} min="0" max={data.data2} value={data.data}></meter>
            </div>
        </>
    )
}