let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d");
let video = document.querySelector("#video")
let gallery = document.querySelector("#gallery")

let images = [];

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({video: {width: 350, height: 291}}).then(stream => {
        video.srcObject = stream;
        video.play()
    })

}

document.getElementById("snap").addEventListener("click",() => {
    context.drawImage(video, 0,0,canvas.width, canvas.height);
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

    if (notificationPermission === 'granted') {
        createNotification();
        
    }
    

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


//notis

function createNotification() {
    const text = 'Bild sparad!';

    const notification = new Notification('Notis', { body: text });

    notification.addEventListener('click', () => {
        window.open('https://localhost:3000');
    });
}

function requestNotificationsPermission() {
    Notification.requestPermission().then((permission) => {
        console.log(permission);
        notificationPermission = permission;
    });
}



requestNotificationsPermission();

