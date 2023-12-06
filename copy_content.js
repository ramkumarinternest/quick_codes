const getBody = document.querySelector('body');
getBody.addEventListener('click', ()=>{
    navigator.clipboard.writeText(getBody.innerText.trim().replace("  "," "));
});
