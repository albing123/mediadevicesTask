
let images = JSON.parse(localStorage.getItem("savedImages"));
 



function getImages() {
    

    let imageArray = images.map(function(image){
        return ` <div class="image-wrapper">
        <img src ="${image.image}" id="${image.id}"></img>
        <button id="delete-btn" onclick="deleteFunction('${image.image}')"><i class="fa fa-times" aria-hidden="true"></i></button>
    </div> `
 
    }).join(" ")

   
    document.getElementById("gallery").innerHTML = imageArray
        
    }

  

 


function deleteFunction (index) {

    
    images = JSON.parse(localStorage.getItem("savedImages"));
    
    

    images = images.filter((image) => {
        
        if (image.image !== index) {
            return image.image
        }
    });
    
saveToLocalStorage(images);
    
} 

function saveToLocalStorage(images) {

    document.location.reload(true)
    localStorage.setItem('savedImages', JSON.stringify(images));
    
}


getImages()


window.addEventListener('load', async () => {
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('service-worker.js');
        } catch(err) {
            console.error('Error with Service Worker', err)
        }
    }
});

