import Drawer from '@mui/material/Drawer';
import DrawerMenu from './drawermenu';
import { useState } from 'react'
import Image from 'next/image';

export default function Header(){
    // drawerがopenしているかどうかのstate
    const [drawerOpened, setDrawerOpened] = useState(false);
    return(
        <>
            <header>
                <p>ヘッダー</p>
                <Image
                    src={"/image/hamburger.svg"} 
                    height={20} width={20} alt='ハンバーガー'
                    onClick={() => setDrawerOpened(true)}
                />
                <Drawer
                    anchor={'left'}
                    open={drawerOpened}
                    onClose={() => setDrawerOpened(false)}
                    PaperProps={{ style: { width: '70%' } }}>
                    <DrawerMenu />
                </Drawer>
            </header>
        </>
    )
}