import { gifData } from "/data.js"

const moodListDiv = document.getElementById('mood-list-div')
const memeModal = document.getElementById('meme-modal')
const getGifBtn = document.getElementById('get-gif')
const memeModalInner = document.getElementById('meme-modal-inner')
const closeBtn = document.getElementById('meme-modal-close-btn')

moodListDiv.addEventListener('change', highlightCheckedOption)
closeBtn.addEventListener('click', closeGif)
getGifBtn.addEventListener('click', render)


function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeGif() {
    memeModal.style.display = 'none'
}

function render(){
    const gif = getGif()
    memeModalInner.innerHTML = `
    <img 
    class="gif" 
    src="${gif.gif}"
    alt="${gif.alt}"
    >
    `
    memeModal.style.display = 'flex'
}

function getGif(){
    const gifArray = getMatched()
    return gifArray[0]
}


function getMatched() {
    if(document.querySelector('input[type="radio"]:checked')) {
        const currentMood = document.querySelector('input[type="radio"]:checked').value
        const findMood =  gifData.filter(function(mood){
            return mood.topic.includes(currentMood)
        })
        return findMood
    }
}

function getMoodRadios(arr) {
    let radios = ``
    const getMoods = getTopicsFromArray(arr)
    for (let mood of getMoods) {
        radios += `
        <div class="radio">
        <label for="${mood}">${mood}</label>
        <input type="radio" id="${mood}" value="${mood}" name="moodies">
        </div>`
    }
    moodListDiv.innerHTML = radios

}

function getTopicsFromArray(arr) {
    let topicList = []
    for (let object of arr){
        topicList.push(object.topic[0])
    }
    return topicList
}

getMoodRadios(gifData)
