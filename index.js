let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d");
let video = document.querySelector("#video")
let gallery = document.querySelector("#gallery")

let images = [];

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({video: {width: 342, height: 291}}).then(stream => {
        video.srcObject = stream;
        video.play()
    })

}

document.getElementById("snap").addEventListener("click",() => {
    context.drawImage(video, 0,0,342, 291);
    const imageData = canvas.toDataURL("image/png");


    document.getElementById("video").style.visibility = "hidden"
    document.getElementById("newPicture").style.visibility = "visible"
    document.getElementById("snap").style.visibility = "hidden"
    document.getElementById("canvas").style.visibility = "visible"

  
    images = JSON.parse(localStorage.getItem("savedImages")) || [];
    images.push({
        id: images.length,
        image: imageData
    })
    localStorage.setItem("savedImages", JSON.stringify(images));

});

document.getElementById("newPicture").addEventListener("click",() => {

    document.getElementById("video").style.visibility = "visible"
    document.getElementById("snap").style.visibility = "visible"
    document.getElementById("newPicture").style.visibility = "hidden"
    document.getElementById("canvas").style.visibility = "hidden"

})




window.addEventListener('load', async () => {
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('service-worker.js');
        } catch(err) {
            console.error('Whooopsie!', err)
        }
    }
});
