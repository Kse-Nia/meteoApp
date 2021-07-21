import tabJourEnOrdre from "./Utilitaire/gestionTemps.js";

// Mise en place API

const keyApi = "33ce073b6c5dedf491a39c76a5344310";
let resultApi;

// Définition variables

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempsH = document.querySelectorAll(".heure-prevision-valeur");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");
const imgIcon = document.querySelector(".bloc__img");

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
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      console.log(data);

      resultApi = data;
      temps.innerText = resultApi.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultApi.current.temp)}°`;
      localisation.innerText = resultApi.timezone;

      // Partie avec les heures

      let heureAct = new Date().getHours();

      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureAct + i * 3;

        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24}h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = "00 h";
        } else {
          heure[i].innerText = `${heureIncr}h`;
        }
      }

      for (let j = 0; j < tempsH.length; j++) {
        tempsH[j].innerText = `${Math.trunc(resultApi.hourly[j * 3].temp)}°`;
      }

      for (let k = 0; k < tabJourEnOrdre.length; k++) {
        joursDiv[k].innerText = tabJourEnOrdre[k].slice(0, 3);
      }

      for (let l = 0; l < 7; l++) {
        tempJoursDiv[l].innerText = `${Math.trunc(
          resultApi.daily[l + 1].temp.day
        )}°`;
      }

      //Partie icon

      if (heureAct > 6 && heureAct < 21) {
        imgIcon.src = `ressources/jour/${resultApi.current.weather[0].icon}.svg`;
      } else {
        imgIcon.src = `ressources/nuit/${resultApi.current.weather[0].icon}.svg`;
      }
    });
}
