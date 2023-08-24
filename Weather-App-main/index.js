const searchInputData = document.querySelector("[data-searchInput]");
const searchForm = document.querySelector("[data-searchForm]");
const loadingGif = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorDiv = document.querySelector(".for-error");

const API_KEY = "168771779c71f3d64106d8a88376808a";


getLocation();


// elements that contains information in UI

const cityName = document.querySelector('[data-cityName]');
const countryFlag = document.querySelector('[data-countryFlag]');
const description = document.querySelector('[data-weatherDiscription]');
const weatherIcon = document.querySelector('[data-weatherIcon]');
const temp = document.querySelector('[data-temprature]');
const windspeed = document.querySelector('[data-windspeed]');
const humidity = document.querySelector('[data-humidity]');
const clouds = document.querySelector('[data-cloudiness]');
const currLocation = document.querySelector('.current-location');


// Event listener on search bar


searchForm.addEventListener("submit" , (e) => {

    e.preventDefault();
    
    let cityName = searchInputData.value;

    getWeatherInfo(cityName);

});

async function getWeatherInfo(city){

    if(!searchInputData.value){
        return;
    }

    currLocation.classList.add('inactive');


    let cityName = city;

    loadingGif.classList.add('active');
    errorDiv.style.opacity = 0;
    userInfoContainer.classList.remove('active');

    try{
        let response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        let data = await response.json();
        
        errorDiv.style.opacity = 0;
        loadingGif.classList.remove('active');
        userInfoContainer.classList.add('active');
    
        renderDataOnUI(data);
    }
    catch(err){

        userInfoContainer.classList.remove('active');

        errorDiv.style.opacity = 1;

    }

};



 function renderDataOnUI(data){

    cityName.innerText = data?.name;
    countryFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    description.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    
    tempInKelvin = data?.main?.temp;
    tempInCelcius = (tempInKelvin - 273.15).toFixed(2);

    temp.innerText = tempInCelcius + " °C";
    windspeed.innerText = data?.wind?.speed + " M/S";
    humidity.innerText = (data?.main?.humidity).toFixed(2) + " %";
    clouds.innerText = (data?.clouds?.all).toFixed(2) + " %";

 }


 



//  current location weather


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
   const latitude = position.coords.latitude;
   const longitude =  position.coords.longitude;

   currentLocation(latitude , longitude);
}

async function currentLocation(lat , long){


    try{

        errorDiv.style.opacity = 0;
        loadingGif.classList.add('active');

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        const data = await response.json();
    
        loadingGif.classList.remove('active');
        userInfoContainer.classList.add('active');
    
        renderDataOnUI(data);
    }
    catch(err){
        loadingGif.classList.remove('active');
        errorDiv.style.opacity = 1;
    }

    
};

