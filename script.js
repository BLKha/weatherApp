const apiKey="c058b488aa199048cab9c8ed4290e772";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search .input-container input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const clearBtn = document.querySelector(".clear-icon");



searchBox.addEventListener('input',()=>{
    if(searchBox.value.length > 0){
        clearBtn.style.display= "inline"
    }else{
        clearBtn.style.display= "none"
    }
})
    clearBtn.addEventListener('click',()=>{
        searchBox.value= '';
        clearBtn.style.display ="none";
        searchBox.focus();
    })

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
     if(response.status == 404){
        document.querySelector(".error").style.display= "block"
        document.querySelector(".weather").style.display= "none"
     }
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML =data.name;
    document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + "℃";
    document.querySelector(".humidity").innerHTML =data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =data.wind.speed + " km/h";
    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./images/clear.png"
    }else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./images/clouds.png"
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./images/drizzle.png"
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./images/rain2.png"
    }else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "./images/snow.png"
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "./images/mist.png"
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display= "none"
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})
searchBox.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        checkWeather(searchBox.value);
    }
})