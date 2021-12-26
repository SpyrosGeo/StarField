const speedSlider = document.getElementById("speedRange")
console.log(typeof(speedSlider.value))
// variables declaration

const COLOR_SPACE = "black";
const COLOR_STARS = "white";
const STAR_NUM = 200;
const STAR_SIZE = 0.005;
let START_SPEED = 0.05;

let canvas = document.createElement("canvas");


let ctx = canvas.getContext("2d")
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
document.body.appendChild(canvas)

const randomSign = () => {
    return Math.random() >= 0.5 ? 1 : -1;
}

let stars = []
let starSpeed = START_SPEED * canvas.width;
let xv = starSpeed * randomSign() * Math.random()
let yv = Math.sqrt(Math.pow(starSpeed, 2) - Math.pow(xv, 2)) * randomSign()


for (let i = 0; i < STAR_NUM; i++) {
    let speedMult = Math.random() * 1.5 + 0.5
    stars[i] = {
        r: Math.random() * STAR_SIZE * canvas.width / 2,
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        xv: xv * speedMult,
        yv: yv * speedMult
    }
}





const loop = (timeNow) => {
    //time difference
    timeDelta = timeNow - timeLast
    timeLast = timeNow;
    //space background
    ctx.fillStyle = COLOR_SPACE;
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    //draw stars
    ctx.fillStyle = COLOR_STARS
    for (let i=0;i<STAR_NUM; i++){
        ctx.beginPath();
        ctx.arc(stars[i].x,stars[i].y,stars[i].r,0, Math.PI *2)
        ctx.fill()
        // update the X position of stars

        stars[i].x += stars[i].xv *timeDelta *0.001;
        //reposition the star if it goes offscreen
        if (stars[i].x <0 -stars[i].r){
            stars[i].x = canvas.width + stars[i].r;

        }else if(stars[i].x >canvas.width+stars[i].r){
            stars[i].x = 0 - stars[i].r;

        }
        // update the Y position of stars

        stars[i].y += stars[i].yv *timeDelta *0.001;
        //reposition the star if it goes offscreen
        if (stars[i].y <0 -stars[i].r){
            stars[i].y = canvas.height + stars[i].r;

        }else if(stars[i].y >canvas.height+stars[i].r){
            stars[i].y = 0 - stars[i].r;

        }
    }
    //CAll next frame

    requestAnimationFrame(loop)

}


//animation loop
let timeDelta, timeLast = 0;
requestAnimationFrame(loop)
