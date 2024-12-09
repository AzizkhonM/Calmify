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

let songElement = 0
const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=life';
const apiKey = 'mWyXPGB7qCnI18cKqSgdWg==QsSUMsfSEEPFKpmB';
const ACCESS_KEY = "pmMyzaKHFoLUHPD0NrkksjzOT_hid10TQ64sILWAD4c";
const url = `https://api.unsplash.com/search/photos?query=island&orientation=landscape&per_page=25&client_id=${ACCESS_KEY}`;
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

const author = document.querySelector(".author")
const quoteText = document.querySelector(".quoteText")
const change = document.querySelector("#change")

function quoteGenerator(){
    /* fetch(apiUrl, {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
        author.innerHTML = data[0].author
        quoteText.innerHTML = data[0].quote
})
.catch(error => console.error('Error fetching quotes:', error));
*/
console.log("Quote");
}

quoteGenerator()

change.addEventListener("click", () => {
    quoteGenerator()
})

function player(){
    document.querySelector("audio").src = `../music/${musicData[element].audio}.mp3`
    console.log(musicData[element].class);
    setTimeout(() => {
        document.querySelector(`#${musicData[element].class}`).style.fontWeight = "bold"
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.querySelector("audio");
    const previousMusic = document.querySelector(".previousMusic")
    const playPauseMusic = document.querySelector(".playPauseMusic")
    const nextMusic = document.querySelector(".nextMusic")

    playPauseMusic.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseMusic.src = "/img/music/pause.svg"
            playPauseMusic.style.width = "29px"
        } else {
            audio.pause();
            playPauseMusic.src = "/img/music/play.svg"
            playPauseMusic.style.width = "30px"
        }
    });

    previousMusic.addEventListener("click", () => {
        document.querySelector(`#${musicData[element].class}`).style.fontWeight = "normal"
        if(element == 0){
            element = musicData.length - 1
        } else{
            element--
        }
        player()
        audio.play()
        playPauseMusic.src = "/img/music/pause.svg"
        playPauseMusic.style.width = "29px"
    })

    nextMusic.addEventListener("click", () => {
        document.querySelector(`#${musicData[element].class}`).style.fontWeight = "normal"
        if(element == musicData.length - 1){
            element = 0
        } else{
            element++
        }
        player()
        audio.play()
        playPauseMusic.src = "/img/music/pause.svg"
        playPauseMusic.style.width = "29px"
    })

});

fetch("../data/data.json").then(r=>r.text()).then(text => {
    musicData = JSON.parse(text)
    player()
    console.log(musicData);
    
    const tracklist = document.querySelector(".tracklist")
    console.log(tracklist);
    
    for(let i of musicData){
        console.log(i);
        let h1 = document.createElement("h1")
        h1.setAttribute("id", i.class)
        h1.setAttribute("class", "track_info")
        h1.innerHTML = i.name
        tracklist.appendChild(h1)
    }
})