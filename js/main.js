const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jule",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

const ACCESS_KEY = "pmMyzaKHFoLUHPD0NrkksjzOT_hid10TQ64sILWAD4c";
const url = `https://api.unsplash.com/search/photos?query=nature&orientation=landscape&per_page=25&client_id=${ACCESS_KEY}`;
const background = document.querySelector(".background")
let backgroundImages = []

fetch(url)
  .then(response => response.json())
  .then(data => {
    for(let i = 1; i < (data.results).length; i++){
        backgroundImages.push({
            id: i,
            imgUrl: data.results[i].urls.full
        })        
    }
    console.log(background);
    background.style.backgroundImage = `url(${backgroundImages[0].imgUrl})`
    console.log(backgroundImages);
  })
  .catch(error => {
    console.error("Error fetching images:", error);
  });