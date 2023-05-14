function displayTemperature(response){
console.log(response.data.temperature.current);
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
}

let apiKey="0a49584f932f33a5d9ea5beto34a414d";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
