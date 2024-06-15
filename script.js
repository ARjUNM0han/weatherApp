const fetchData = () => {
    var location = search.value;
    if (location == "") {
        alert("Enter location to search");
    } else {
        // console.log(location);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5b4bee0ba241d092159faf007e166080`
        )
            .then((response) => {
                if (response.status === 404) {
                    alert("Enter a valid Location")
                }
                return response.json()
            })
            .then((result) => displayData(result));
    }
};

const displayData = result => {
    console.log(result)

    var temp = result.main.temp
    var location = result.name
    var weather = result.weather[0].description
    var icon = result.weather[0].icon
    var windSpeed = metersPerSecondToKmPerHour(result.wind.speed)
    var humidity = result.main.humidity
    var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    console.log(temp, location, weather, windSpeed, humidity, iconURL)

    viewWeather.innerHTML = `
     <div class="row text-center">
              <div
                class="col-lg-6 col-md-6 col-sm-12 my-5 d-flex flex-row justify-content-center align-items-center">
                <img
                  class="w-image"
                  src="${iconURL}"
                  alt="" />
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 my-5">
                <div>
                  <span class="web-font1 temp">${temp} C</span>
                </div>
                <div class="my-3">
                  <span>${weather}</span>
                </div>
                <div class="my-3">
                  <span>${location}</span>
                </div>
                <div class="row my-3 container">
                  <div
                    class="col-sm-6 col-md-6 col-lg-6 d-flex flex-row justify-content-center px-3 text-center marb">
                    <div class="text-start">
                      <img
                        src="./images/humidity.png"
                        class="humidity-img"
                        alt="humidity" />
                    </div>
                    <div class="ms-4">
                      <div>
                        <span class="web-font2">${humidity}%</span>
                      </div>
                      <div>
                        <span class="web-font2">humidity</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-6 col-md-6 col-lg-6 d-flex flex-row justify-content-center px-3 text-center">
                    <div class="text-start">
                      <img
                        src="./images/wind_speed.png"
                        class="humidity-img"
                        alt="humidity" />
                    </div>
                    <div class="ms-4">
                      <div>
                        <span class="web-font2">${windSpeed} km\h</span>
                      </div>
                      <div>
                        <span class="web-font2">speed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `
}
const metersPerSecondToKmPerHour = metersPerSecond => {
    return Math.round(metersPerSecond * 3.6);
}

