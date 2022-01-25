

window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector('.temperature-description');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const degreeSection = document.querySelector('.degree-section');
  const locationTimezone = document.querySelector('.location-timezone');
  const iconMain = document.querySelector('.icon');
  const temperatureSpan = document.querySelector('.temp-span')

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long= position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=fc064d6344b04d7588b191729212012&q=${lat},${long}&aqi=no`

      fetch(api)
        .then(response => {
        return response.json();
      })
         .then(data => {
        console.log(data);
        const { temp_f,} = data.current;
        const iconData = data.current.condition.icon;
        // Formula for Celcius
        let celcius = Math.floor((temp_f - 32) * (5 / 9)) 
        //Set DOM Elements from the API
        temperatureDegree.textContent = temp_f;
        temperatureDescription.textContent = data.current.condition.text ;
        locationTimezone.textContent = `${data.location.name}, ${data.location.region}`;
        iconMain.setAttribute("src", iconData);

        degreeSection.addEventListener('click', () => {
          if (temperatureSpan.textContent === 'F') {
            temperatureSpan.textContent = 'C';
            temperatureDegree.textContent = celcius;
          } else {
            temperatureSpan.textContent = 'F'
            temperatureDegree.textContent = temp_f;
          }
        })
      })
      })
  } else {
    h1.textContent = "Please Enable Geolocation"
  }
});

