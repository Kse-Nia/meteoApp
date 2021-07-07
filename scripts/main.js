// Mise en place API

const keyApi = "33ce073b6c5dedf491a39c76a5344310";
let resultApi;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);

      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      appelApi(long, lat);
    },
    () => {
      alert(`Vous avez refusé la géolocalisation.`);
    }
  );
}

function appelApi(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`)
  .then((reponse) => {
    return reponse.json();
  })
  .then((data) => {
    console.log(data); 

    resultApi = data;
    temps.innerText = resultApi.current.weather[0].description;
    temperature.innerText = `${Math.trunc(resultApi.current.temp)}°`
    localisation.innerText = resultApi.timezone;

  })
}
