addEventListener('load', () => {
   const bg = document.querySelector('#card')
   const kelvin = 273.15

   let lat
   let lon

   if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {

         lat = position.coords.latitude
         lon = position.coords.longitude
         const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6f2f501579393750fbdfcdc96e9fefe4&lang=it`

         const api2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6f2f501579393750fbdfcdc96e9fefe4&lang=it`

         console.log(api)
         console.log(api2)
         // console.log(lat);
         // console.log(lon);

         fetch(api)
            .then(response => {

               let data = response.json()
               return data

            })
            .then(data => {

               let spinner = document.querySelector('.wrapper')
               spinner.classList.add('hidden')

               let iconid = data.weather[0].icon
               let temperature = Math.floor(data.main.temp - kelvin)
               let humidity = data.main.humidity
               let location = data.name
               let meteo = data.weather[0].main
               let description = data.weather[0].description

               let today = new Date();
               let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

               let lastChar = iconid.charAt(iconid.length - 1)

               setBg(lastChar, bg)

               let iconBg = document.querySelector('#iconbg')

               iconBg.style.backgroundImage = `url(./icons/${iconid}.png)`


               let meteoEl = document.querySelector('.meteo')
               // meteoEl.innerHTML = `<h2>${meteo} </h2>`
               //console.log(meteoEl);

               let descriptionEl = document.querySelector('.description')
               descriptionEl.innerHTML = `<p>${description} </p>`

               let tempEl = document.querySelector('.temp')
               tempEl.innerHTML = `<p id="temp">${temperature}°c </p>`

               let city = document.querySelector('.city')
               city.innerHTML = `<p>${location} </p>`

            })
            .catch(error => console.log(error))


         fetch(api2)
            .then(response => {

               let data2 = response.json()
               return data2

            })
            .then(data2 => {
               console.log(data2);
               let forecast = []
               let i = 8

               for (i; i < 40; i += 8) {
                  let day = []
                  const date = data2.list[i].dt_txt;
                  const temp = data2.list[i].main.temp;
                  const main = data2.list[i].weather[0].description;
                  const icon2 = data2.list[i].weather[0].icon;
                  day.push(date, temp, main, icon2)
                  forecast.push(day)
               }

               console.log(forecast);

               let underCard = bg.querySelector('#forecast')


               forecast.forEach(el => {

                  let temperature = document.createElement('p')
                  temperature.classList.add('t')
                  temperature.innerText = Math.floor(el[1] - kelvin) + '°'
                  let description = document.createElement('p')
                  description.classList.add('forecast-description')
                  description.innerText = el[2]

                  let fContainer = document.createElement('div')
                  fContainer.classList.add('fcontainer')


                  /*/============
                  DATE ODISSEY
                  // ===========*/

                  let oldDate = el[0]
                  //console.log('data API: ' + oldDate)

                  let bDate = convertDateForIos(oldDate)

                  // console.log('data convertita per ios: ' + bDate)

                  let date = new Date(bDate)
                  //console.log(date)
                  let month = date.toDateString().split(' ')[1]
                  let newDate = date.getDate() + ' ' + month//(date.getMonth() + 1)
                  //console.log('data finale: ' + newDate);

                  /*/============
                  END DATE ODISSEY
                  // ===========*/

                  let fDate = document.createElement('p')
                  fDate.innerText = newDate

                  let fIconId = el[3]
                  let icons = document.createElement('div')
                  icons.classList.add('icons')
                  icons.style.backgroundImage = `url(./icons/${fIconId}.png)`


                  underCard.appendChild(fContainer)
                  fContainer.appendChild(fDate)
                  fContainer.appendChild(icons)
                  fContainer.appendChild(temperature)
                  fContainer.appendChild(description)
               });

            })

      });

   }

})

function setBg(lastChar, bg) {
   lastChar === 'n' ? bg.style.backgroundImage = "url(./bg/night.png)" : bg.style.backgroundImage = "url(./bg/day.png)"
}

function convertDateForIos(date) {
   var arr = date.split(/[- :]/);
   date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
   return date;
}

