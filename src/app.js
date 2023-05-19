function formatDate(timestamp){
    let date= new Date(timestamp);
    let hours= date.getHours();
      if (hours < 10) {
     hours = `0${hours}`;
     }
    let minutes= date.getMinutes();
      if (minutes < 10) {
     minutes = `0${minutes}`;
      }
    let days= 
    ["Sunday", 
     "Monday", 
     "Tuesday", 
     "Wednesday",
     "Thursday", 
     "Friday", 
     "Saturday"];
    let day= days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement= document.querySelector("#forecast");
    let days= ["Sat","Sun","Mon","Tue","Wed","Thu"];
    let forecastHTML=`<div class="row">`;

    days.forEach(function(day){
     forecastHTML= forecastHTML+= `
        <div class="col-2">
             <div class="card forecast">
             <div class="card-body">
                  <div class="weather-forecast-date">${day}</div>
                  <img src="src/rainy.jpeg" alt="" width="32" />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> 
                      18 °</span>
                    <span class="weather-forecast-temperature-min"> 
                      12 °</span>
                  </div>
             </div>
            </div>
        </div>
              `;
    });
    
    forecastHTML+= `</div>`;
    forecastElement.innerHTML= forecastHTML;
}
function getForecast(coordinates){
 
    let apiKey=  "0a49584f932f33a5d9ea5beto34a414d"
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
   console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
   let cityElement = document.querySelector("#city");
   cityElement.innerHTML= response.data.city;
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML= Math.round(response.data.temperature.current);
   let descriptionElement = document.querySelector("#description");
   descriptionElement.innerHTML= response.data.condition.description;
   let humidity= document.querySelector("#humidity");
   humidity.innerHTML= response.data.temperature.humidity;
   let wind= document.querySelector("#wind");
   wind.innerHTML= response.data.wind.speed;
   let pressure = document.querySelector("#pressure");
   pressure.innerHTML= response.data.temperature.pressure;
   let date = document.querySelector("#date");
   date.innerHTML= formatDate(response.data.time*1000);
   let iconElement= document.querySelector("#icon");
   iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
   iconElement.setAttribute("alt", response.data.condition.description);
   celsiusTemperature= response.data.temperature.current;
 getForecast(response.data.coordinates);
}
function search(city){
  let apiKey="0a49584f932f33a5d9ea5beto34a414d";
  let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);  
}
function handleSubmit(event){
    event.preventDefault();
    let cityInput=document.querySelector("#city-search");
    search(cityInput.value);
    
}
function displayFahrenheitTemperature(event){
     event.preventDefault();
     let fahrenheitTemperature= (celsiusTemperature * 9)/5 + 32 ;
     celsiusLink.classList.remove("active");
     fahrenheitLink.classList.add("active");
     let temperatureElement = document.querySelector("#temperature");
     temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
     celsiusLink.classList.add("active");
     fahrenheitLink.classList.remove("active");
     let temperatureElement = document.querySelector("#temperature");
     temperatureElement.innerHTML= Math.round(celsiusTemperature);
}
let celsiusTemperature= null;

let form= document.querySelector("#city-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

search("New York");