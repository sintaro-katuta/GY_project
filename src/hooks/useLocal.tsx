import { useRouter } from 'next/router'
import ja from "../public/locale/ja"
import en from "../public/locale/en"
import kr from "../public/locale/kr"

export const useLocale = () => {
  const { locale } = useRouter();
  let t = ja
  if(locale == "en"){
    t = en
  }else if(locale === "kr"){
    t = kr
  }
  return { locale, t };
}