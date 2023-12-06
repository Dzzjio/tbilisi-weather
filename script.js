const weatherApi = 'https://api.open-meteo.com/v1/forecast?latitude=41.6941&longitude=44.8337&hourly=temperature_2m&current_weather=true&forecast_days=3';



fetch(weatherApi).then((data) =>  {
   data.json().then((responce) => {
      let temperature = responce.current_weather.temperature;

      document.getElementById('h-1').innerHTML = ` ${Math.round(temperature)}°`;

      const arrOf5 = responce.hourly.time.slice(0, 5);
      let weatherDivsHtmlSmall = '';

      arrOf5.forEach((hour, i) => {
         let div = `
            <div>
               <div class="el">${hour.slice(12)} საათი</div>
               <div class="el"><img class="small-img-5" src="${hour.slice(12, 13) > 1 && hour.slice(12, 13) > 3 ? 'img/cloud.png' : 'img/rain.png'} "></div>
               <div class="el">${Math.round(responce.hourly.temperature_2m[i])}°</div>
            </div>`

            weatherDivsHtmlSmall += div;
      });

      document.getElementById('row-of-weathers').innerHTML = weatherDivsHtmlSmall;

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;


      document.getElementById('para').innerHTML = formattedDate
      document.getElementById('wind-speed').innerHTML = `ქარის სიჩქარე: ${responce.current_weather.windspeed} კმ/სთ`;
      document.getElementById('preasure').innerHTML = `წნევა: ${responce.elevation} ა`;

      const arrOf25 = responce.hourly.time.slice(0, 25);
      let weatherDivsHtml = '';

      arrOf25.forEach((hour, i) => {
         
         let div = `
            <div class="single-weather">
               <p>${hour.slice(12)} საათი</p>
               <img class="small-img-weather" src="${hour.slice(12, 13) > 1 && hour.slice(12, 13) > 3 ? 'img/cloud.png' : 'img/rain.png'} ">
               <p class="bold">${Math.round(responce.hourly.temperature_2m[i])}°</p>
            </div>`;

         weatherDivsHtml += div;
         console.log(hour.slice(12, 13) > 0 && hour.slice(12, 13) > 5);
      });
      document.getElementById('big-weather-container').innerHTML = weatherDivsHtml
   });

});
