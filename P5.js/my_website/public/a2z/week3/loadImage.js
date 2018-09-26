var image = document.getElementById("image")
var button = document.getElementById("button")
const url = "https://dog.ceo/api/breeds/image/random"
let imageUrl

window.onload = () => {
    getImage(url)
    button.onclick = () => {
        getImage(url)
    }
}

var getImage = (url) =>  {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        image.src = data.message
    })
    .catch(error => console.log(error))
}