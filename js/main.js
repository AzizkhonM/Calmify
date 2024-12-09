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
const previous = document.querySelector(".previous")
const next = document.querySelector(".next")
let backgroundImages = []
let element = 0

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < (data.results).length; i++){
            backgroundImages.push({
                id: i,
                imgUrl: data.results[i].urls.full
            })        
        }
        console.log(background);
        background.style.backgroundImage = `url(${backgroundImages[element].imgUrl})`
        console.log(backgroundImages);
    })
    .catch(error => {
        console.error("Error fetching images:", error);
    });

const time2 = document.querySelector(".time2")
const GoodWhat = document.querySelector(".GoodWhat")
const day = document.querySelector(".day")
setInterval(() => {
    let date = new Date()
    let timeOfDay = "morning"
    let hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    time2.innerHTML = `${hours} : ${minutes} : ${seconds}`;
    hours = Number(hours)

    if(hours >= 6 && hours <= 11){
        timeOfDay = "Morning"
    } else if(hours >= 12 && hours <= 17){
        timeOfDay = "Afternoon"
    } else if(hours >= 18 && hours <= 20){
        timeOfDay = "Evening"
    } else if(hours >= 21 || hours <= 5){        
        timeOfDay = "Night"
    }

    GoodWhat.innerHTML = `Good ${timeOfDay}, `

    day.innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}, 1000)

setTimeout(() => {
    let good = document.querySelector(".good")
    let input = document.createElement("input")
    input.placeholder = "Enter your name"
    input.setAttribute("class", "name")
    good.appendChild(input)
}, 1000);

previous.addEventListener("click", () => {
    if(element == 0){
        element = backgroundImages.length - 1
        background.style.backgroundImage = `url(${backgroundImages[element].imgUrl})`
    } else{
        element--
        background.style.backgroundImage = `url(${backgroundImages[element].imgUrl})`
    }
})

next.addEventListener("click", () => {
    if(element == backgroundImages.length-1){
        element = 0
        background.style.backgroundImage = `url(${backgroundImages[element].imgUrl})`
    } else{
        element++
        background.style.backgroundImage = `url(${backgroundImages[element].imgUrl})`
    }
})