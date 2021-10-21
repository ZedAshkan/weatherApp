const key = 'XizEmrDdtWDnkgXr9hLEbEjv54mnMubV'
const form = document.querySelector('#form')
const city = document.querySelector('#city')
const temp = document.querySelector('#temp')
const box = document.querySelector('#box')

form.addEventListener('submit', e => {
    e.preventDefault()

    cityV = form.querySelector('input').value.trim();

    updateCity(cityV)
    form.reset()
})

const updateCity = async(cityV)=>{

    const cityCode = await getCity(cityV)
    const weather = await getWeather(cityCode.Key)

    const temperature = weather.Temperature.Metric.Value
    const country = cityCode.Country.ID
    const province = cityCode.AdministrativeArea.EnglishName
    const WeatherIcon = weather.WeatherIcon
    const WeatherText = weather.WeatherText
    const cityEnglishName = cityCode.EnglishName

    box.innerHTML = `
    <div class="card w-75 mx-auto m-3 " style="width: 18rem;">
			<img src="https://picsum.photos/400/300" style="height: 300px;" class="card-img-top" alt="...">
            <div class="card-body position-relative">
				<img src="./assets/icons/${WeatherIcon}.svg" class="w-icons">
                <h5 class="card-title text-center fs-1 mt-5">
						<span id="temp">${temperature}</span>
						<span>&deg;C</span>
				</h5>
                <p class="card-text text-center fs-6">${WeatherText}</p>
				<p id="city" class="card-text text-center fs-1 fw-bold mb-0">${cityEnglishName}</p>
                <p class="card-text text-center fs-6">${country} , ${province}</p>
			</div>
		</div>
    `
}

const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query);
    const data = await response.json()

    return data[0]
}

const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search"
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(base + query)
    const data = await response.json()

    return data[0]
}