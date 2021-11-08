const form = document.querySelector('form')
const search = form.search
const results = document.querySelector('#results')
const key = 'b0e197f79fa7487596f54611212710'
const locationName = document.querySelector('#location-name')
const locationC = document.querySelector('#location-c')
const locationR = document.querySelector('#location-r')
const tempC = document.querySelector('#temp-c')
const feelsLike = document.querySelector('#feels-like')
const weatherIcon = document.querySelector('#weather-icon')
const whindSpeed = document.querySelector('#wind-speed')
const humidity = document.querySelector('#humidity')
const weatherType = document.querySelector('#weather-type')

const spin = `<i class="bi bi-arrow-repeat my-spiner"></i>`

const spiner = ()=>{
    locationName.innerHTML = spin 
    locationC.innerHTML = spin 
    locationR.innerHTML = spin 
    tempC.innerHTML = spin 
    feelsLike.innerHTML = spin 
    whindSpeed.innerHTML = spin 
    humidity.innerHTML = spin 
    weatherType.innerHTML = spin
}

spiner()

const current = async (query) =>{
    const base = 'https://api.weatherapi.com/v1/current.json?key='

    const response = await fetch(base + key + '&q=' + query)
    const data = await response.json()
    return data
}

const currentSet = async (query)=>{
    spiner()
    const data = await current(query);
    locationName.innerHTML = data.location.name
    locationC.innerHTML = data.location.country
    locationR.innerHTML = data.location.region
    tempC.innerHTML = data.current.temp_c + '&deg; C'
    feelsLike.innerHTML = data.current.feelslike_c + '&deg; C'
    weatherIcon.setAttribute('src',data.current.condition.icon)
    weatherIcon.classList.remove('animate-spin')
    whindSpeed.innerHTML = data.current.wind_kph
    humidity.innerHTML = data.current.humidity + '%'
    weatherType.innerHTML = data.current.condition.text
}

const autoSearch = async (query) => {
    const base = 'https://api.weatherapi.com/v1/search.json?key='

    const response = await fetch(base + key + '&q=' + query)
    const data = await response.json()
    return data
}

const resultSearch = async (query) => {
    const array = await autoSearch(query)
    const topFive = [array[0], array[1], array[2], array[3], array[4]]
    results.innerHTML = ``
    topFive.map(data => {
        results.innerHTML += `
<div class="cursor-pointer p-3 text-white hover:bg-white hover:text-black border-t-2 search-item" data-url="${data.url}">
    ${data.name}
</div>
`
    })
}

results.addEventListener('mousedown' , e=>{
    if(e.target.classList.contains('search-item')){
        const dataUrl =  e.target.getAttribute('data-url');
        currentSet(dataUrl)
        form.reset()
        results.innerHTML = ``
    }
})



search.addEventListener('focus', e => {
    results.removeAttribute('hidden')
})

search.addEventListener('blur', e => {
    results.setAttribute('hidden', 'true')
})

search.addEventListener('keyup', e => {
    const searchValue = search.value.trim()
    const searchLength = search.value.trim().length
    if (searchLength >= 3) {
        resultSearch(searchValue)
    } else {
        results.innerHTML = ``
    }
})

currentSet("tehran")

form.addEventListener('submit',e=>{
    e.preventDefault()
    const searchValue = search.value.trim()
    currentSet(searchValue)
    form.reset()
})