let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d");
let video = document.querySelector("#video")
let gallery = document.querySelector("#gallery")


let images = [];


if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        video.play()
    })

}



document.getElementById("snap").addEventListener("click",() => {
    context.drawImage(video, 0,0,640, 480);
    const imageData = canvas.toDataURL("image/png");


    

    
    
    
    images = JSON.parse(localStorage.getItem("savedImages")) || [];
    images.push({
        id: images.length,
        image: imageData
    })
    localStorage.setItem("savedImages", JSON.stringify(images));

});





