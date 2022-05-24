


function getImages() {
    const images = JSON.parse(localStorage.getItem("savedImages"));

    for(const image of images) {
        createImage(image);
    }
}

function createImage(image) {
    const imageElem = document.createElement("img");
    imageElem.setAttribute("src", image.image);

    gallery.append(imageElem);

}

getImages()


window.addEventListener('load', async () => {
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('service-worker.js');
        } catch(err) {
            console.error('Whooopsie!', err)
        }
    }
});