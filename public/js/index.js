// new Glide('.glide').mount();

const photoSlideWrap = document.querySelector(".photoSlideWrap")
console.log(photoSlideWrap);

const slideItem = document.querySelectorAll(".slideItem")
console.log(slideItem[1]);

const maxImg = slideItem.length;
console.log(maxImg);

const container = document.querySelector(".container");
const imgBox = document.querySelectorAll(".imgBox");
const imgBoxNum = imgBox.length
const slideEle = document.querySelector(".slide-items")
const couponSlideItems = document.querySelector(".couponSlideItems")
const slideImg = document.querySelectorAll(".slideImg")
const couponSlideImg = document.querySelectorAll(".couponSlideImg")


let num = 1;

setInterval(()=>{
    if(num < maxImg){
        slideItem[num-1].style.opacity = 0;
        slideItem[num].style.opacity = 1;
        num++;
    }else{
        slideItem[num-1].style.opacity = 0;
        slideItem[0].style.opacity = 1;
        num = 1;
    }
},3000)

let slideNum = 0

// setInterval(()=>{
//     if(slideNum < 3){
//         imgBox[slideNum].classList.remove("active")
//         imgBox[slideNum + 1].classList.add("active")
//         slideNum++
//     }else if(slideNum = 3){
//         imgBox[slideNum].classList.remove("active")
//         imgBox[0].classList.add("active")
//         slideNum = 0;
//         console.log(slideNum);
//     }
// },4000)

// $('.slide-items').slick({
//     centerMode: true,
//     centerPadding: '70px',
//     slidesToShow: 3,
//     autoplay:true,
//     autoplaySpeed:3000,
//     dots:true,
//     draggable:false,
//     pauseOnFocus:false,
//     pauseOnHover:false,
//     pauseOnDotsHover:false,
// });


slideEle.addEventListener("scroll",()=>{
    console.log(slideEle.scrollLeft);
    if(slideEle.scrollLeft <= 200){
        if(slideImg[0].classList.contains("active")){
        }else{
            slideImg[0].classList.add("active")
            slideImg[1].classList.remove("active")
            slideImg[2].classList.remove("active")
            slideImg[3].classList.remove("active")
        }
    }else if(slideEle.scrollLeft > 200 && slideEle.scrollLeft <= 450){
        if(slideImg[1].classList.contains("active")){
        }else{
            slideImg[1].classList.add("active")
            slideImg[0].classList.remove("active")
            slideImg[2].classList.remove("active")
            slideImg[3].classList.remove("active")
        }
    }else if(slideEle.scrollLeft > 450 && slideEle.scrollLeft <= 700){
        if(slideImg[2].classList.contains("active")){
        }else{
            slideImg[2].classList.add("active")
            slideImg[0].classList.remove("active")
            slideImg[1].classList.remove("active")
            slideImg[3].classList.remove("active")
        }
    }else{
        if(slideImg[3].classList.contains("active")){
        }else{
            slideImg[3].classList.add("active")
            slideImg[0].classList.remove("active")
            slideImg[1].classList.remove("active")
            slideImg[2].classList.remove("active")
        }
    }
})

couponSlideItems.addEventListener("scroll",()=>{
    console.log(couponSlideItems.scrollLeft);
    if(couponSlideItems.scrollLeft <= 200){
        if(couponSlideImg[0].classList.contains("active")){
        }else{
            couponSlideImg[0].classList.add("active")
            couponSlideImg[1].classList.remove("active")
            couponSlideImg[2].classList.remove("active")
            couponSlideImg[3].classList.remove("active")
        }
    }else if(couponSlideItems.scrollLeft > 200 && couponSlideItems.scrollLeft <= 450){
        if(couponSlideImg[1].classList.contains("active")){
        }else{
            couponSlideImg[1].classList.add("active")
            couponSlideImg[0].classList.remove("active")
            couponSlideImg[2].classList.remove("active")
            couponSlideImg[3].classList.remove("active")
        }
    }else if(couponSlideItems.scrollLeft > 450 && couponSlideItems.scrollLeft <= 700){
        if(couponSlideImg[2].classList.contains("active")){
        }else{
            couponSlideImg[2].classList.add("active")
            couponSlideImg[0].classList.remove("active")
            couponSlideImg[1].classList.remove("active")
            couponSlideImg[3].classList.remove("active")
        }
    }else{
        if(couponSlideImg[3].classList.contains("active")){
        }else{
            couponSlideImg[3].classList.add("active")
            couponSlideImg[0].classList.remove("active")
            couponSlideImg[1].classList.remove("active")
            couponSlideImg[2].classList.remove("active")
        }
    }
})