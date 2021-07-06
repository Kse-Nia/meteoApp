// Mise en place API

const keyApi = "33ce073b6c5dedf491a39c76a5344310";
let resultApi;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);

      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      AppelApi(long, lat);
    },
    () => {
      alert(`Vous avez refusé la géolocalisation.`);
    }
  );
}

function AppelApi(long, lat){
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`)
.then((reponse) => {
    return reponse.json();
})
.then((data) => { 
    console.log(data);
})

}

