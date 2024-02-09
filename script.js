// const container = document.querySelector(".container");
// const searchButton = document.querySelector(".search-box button");
// const weatherBox = document.querySelector("weather-box");
// const weatherDetails = document.querySelector(".weather-details");

// searchButton.addEventListener("click", () => {
//   const APIKey = "84f63d7e955fc80340335af805a78fe3";
//   const city = document.querySelector(".search-box input").value.trim();

//   if (city == "") return;

//   const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

//   fetch(endpoint)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`API request failed with status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((json) => {
//       // Your code to handle the JSON response and update the UI
//       console.log("error");
//       console.log(json);
//     })
//     .catch((error) => {
//       console.error(error);
//       // Handle errors, e.g., display an error message to the user
//     });

//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
//   )
//     .then((response) => response.json())
//     .then((json) => {
//       const image = document.querySelector(".weather-box img");
//       const temperature = document.querySelector(".weather-box .temperature");
//       const description = document.querySelector(".weather-box .description");
//       const humidity = document.querySelector(
//         ".weather-details .humidity span"
//       );
//       const wind = document.querySelector(".weather-details .wind span");

//       switch (json.weather[0].main) {
//         case "Clear":
//           image.src = "/img/clear.png";
//           break;

//         case "Rain":
//           image.src = "/img/rain.png";
//           break;

//         case "Snow":
//           image.src = "/img/snow.png";
//           break;

//         case "Clouds":
//           image.src = "/img/cloud.png";
//           break;

//         case "Mist":
//           image.src = "/img/mist.png";
//           break;

//         case "Haze":
//           image.src = "/img/mist.png";
//           break;

//         default:
//           image.src = "/img/cloud.png";
//       }

//       // const celsiusTemperature = json.main.temp;
//       // const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//       // const kmPerHour = json.wind.speed;
//       // const milesPerHour = kmPerHour;

//       temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
//       description.innerHTML = `${json.weather[0].description}`;
//       humidity.innerHTML = `${json.main.humidity}%`;
//       wind.innerHTML = `${parseInt(json.wind.speed)} mph`;
//     });
// });

const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

searchButton.addEventListener("click", searchWeather);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchWeather();
  }
});

function searchWeather() {
  // Define the API key for OpenWeatherAppMap API
  const APIKey = "84f63d7e955fc80340335af805a78fe3";
  // Get the city input value and remove leading/trailing spaces
  const city = searchInput.value.trim();
  // Check if the city input is empty, if so, return and do nothing
  if (city == "") return;
  // Fetch weather data from the OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
  )
    // Convert the response to JSON format
    .then((response) => response.json())
    // Handle the JSON data
    .then((json) => {
      // Check if the city is not found (404 error)
      console.log(json.cod);
      if (json.cod == "404") {
        // Update UI to indicate city not found
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      // Select UI elements to display weather data
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      // Use a switch statement to set the weather image based on weather condition

      if (cityHide.textContent == city) {
        return;
      } else {
        // City found, update UI with weather data
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add = "active";
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove = "active";
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "/img/clear.png";
            break;

          case "Rain":
            image.src = "/img/rain.png";
            break;

          case "Snow":
            image.src = "/img/snow.png";
            break;

          case "Clouds":
            image.src = "/img/cloud.png";
            break;

          case "Mist":
            image.src = "/img/mist.png";
            break;

          case "Haze":
            image.src = "/img/mist.png";
            break;

          default:
            image.src = "/img/cloud.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} mph`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone"
        );
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone"
        );
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone"
        );
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 1200);
        }
      }
    })
    .catch((error) => {
      console.error("Error");
    });
}
