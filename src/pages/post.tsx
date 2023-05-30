import { useState } from 'react'
import NextImage from 'next/image';

export default function post(){
    const [ image, setImage ] = useState<FileList>([])
    const [ createImageURL, setCreateImageURL ] = useState([])
    const [ comment, setComment ] = useState("")
    const maxUpload = 4
    
    const addImage = (e: any) => {
        console.log("e.target.files.length",e.target.files.length)
        if(e.target.files.length > maxUpload){
            alert("画像は４枚まで投稿できます")
        }else{
            setImage(e.target.files)
            let list  = []
            for(let i = 0; i < e.target.files.length; i++){
                const imageUrl = URL.createObjectURL(e.target.files[i])
                list.push(imageUrl)
                setCreateImageURL(list)
            }
        }
    }

    const addComment = (e) => {
        setComment(e.target.value)
    }

    const removeImage = (e: any) => {
    // 選択した画像は削除可能
		const newImages = [...image];
        const newUrl = [...createImageURL]
		newImages.splice(e.target.value, 1);
        newUrl.splice(e.target.value, 1);
		setImage(newImages);
        setCreateImageURL(newUrl)
    }

    return(
        <div>
            <h1>投稿</h1>
            <input type="file" multiple accept="image/*,.png,.jpg,.jpeg,.gif,.mp4" onChange={(e) => addImage(e)}/>

            <label htmlFor="comment" onChange={(e) => addComment(e) }>コメント</label>
            <textarea id="comment" cols="30" rows="10"></textarea>

            {createImageURL.map((item, i) => {
                return(
                    <div key={i}>
                        <NextImage alt="プレビュー画像" src={item} width={640} height={480}></NextImage>
                        <button value={i} onClick={(e) => removeImage(e)}>削除</button>
                    </div>
                )}
            )}
        </div>
    )
}