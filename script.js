const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector("weather-box");
const weatherDetails = document.querySelector(".weather-details");

searchButton.addEventListener("click", () => {
  const APIKey = "84f63d7e955fc80340335af805a78fe3";
  const city = document.querySelector(".search-box input").value.trim();

  if (city == "") return;

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

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

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

      // const celsiusTemperature = json.main.temp;
      // const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
      // const kmPerHour = json.wind.speed;
      // const milesPerHour = kmPerHour;

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} mph`;
    });
});
