const imageUrls = [];
function getAllImages(){
    const imagesList = document.querySelectorAll('img');
    imagesList.forEach(image => {
        const url = image.getAttribute('src');
        imageUrls.push(url);
    });
}
getAllImages();

const filteredImages = imageUrls.filter(image => {
    return image.includes('jpg') || image.includes('jpeg');
});

function downloadImage(url){
    const imageName = url.split("/");
    const getImage = imageName[imageName.length-1];
    const versionSplit = getImage.split("?");
    const versionRemoved = versionSplit[0];
      fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = versionRemoved;
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      });
}

var index = 0;
function startDownload(){
    downloadImage(filteredImages[index]);
    index++;
    if(index === filteredImages.length){
        stopDownload();
    }
}

function stopDownload(){
    clearInterval(startLoop);
    alert("Download Completed");
}
const startLoop = setInterval(startDownload, 1000);
