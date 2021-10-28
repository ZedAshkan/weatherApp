const form = document.querySelector('form')
const search = form.search
const results = document.querySelector('#results')
const key = 'b0e197f79fa7487596f54611212710'
const locationName = document.querySelector('#location-name')
const locationC = document.querySelector('#location-c')
const locationR = document.querySelector('#location-r')
const tempC = document.querySelector('#temp-c')
const feelsLike = document.querySelector('#feels-like')

const current = async (query) =>{
    const base = 'https://api.weatherapi.com/v1/current.json?key='

    const response = await fetch(base + key + '&q=' + query)
    const data = await response.json()
    return data
}

const currentSet = async (query)=>{
    const data = await current(query);
    console.log(data)
    locationName.innerHTML = data.location.name
    locationC.innerHTML = data.location.country
    locationR.innerHTML = data.location.region
    tempC.innerHTML = data.current.temp_c
    feelsLike.innerHTML = data.current.feelslike_c
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
    topFive.map(data => {
        results.innerHTML += `
<div class="p-3 text-white hover:bg-white hover:text-black border-t-2">
    ${data.name}
</div>
`
    })
}

search.addEventListener('focus', e => {
    results.removeAttribute('hidden')
})

search.addEventListener('blur', e => {
    results.setAttribute('hidden', 'true')
})

search.addEventListener('keyup', e => {
    const searchValue = search.value.trim()
    const searchLength = search.value.trim().length
    results.innerHTML = ``
    if (searchLength >= 3) {
        results.innerHTML = ``
        resultSearch(searchValue)

    } else {
        results.innerHTML = ``
    }
})

form.addEventListener('submit',e=>{
    e.preventDefault()
    const searchValue = search.value.trim()
    currentSet(searchValue)
    form.reset()
})