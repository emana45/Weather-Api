var searchInput = document.querySelector('.form-control');
var findBtn = document.querySelector('.btn');
var today = document.querySelector('.today-weather');
var tomorrow = document.querySelector('.tomorrow-weather');
var next = document.querySelector('.next-weather')



searchInput.addEventListener('keypress', function () {
    getForecast(searchInput.value);
})


async function getForecast(x) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e9c0f7c489e4e44bff203248241007&q=${x}&days=3`);
    var data = await response.json();
    var city = data.location.name;
    var currentDay = data.forecast.forecastday[0];
    var tomDay = data.forecast.forecastday[1];
    var nextDay = data.forecast.forecastday[2];
    displayToday(currentDay, city);
    displayTom(tomDay);
    displayNext(nextDay);
}

function displayToday(currentDay, city) {
    var cartona = ` <div class="today-header d-flex justify-content-between p-2">
                            <div class="day">${convertDate(currentDay.date)[0]}</div>
                            <div class="date">${convertDate(currentDay.date)[1]}</div>
                        </div>
                        <div class="today-content px-3 py-4">
                            <div class="city fs-5">${city}</div>
                            <div class="degree">
                                <div class="degree-num">
                                    ${currentDay.day.maxtemp_c}<sup>o</sup>C
                                </div>
                                <div class="degree-photo">
                                    <img src="https:${currentDay.day.condition.icon}" alt="">
                                </div>
                            </div>
                            <div class="today-desc py-3">
                               ${currentDay.day.condition.text}
                            </div>
                            <div class="today-info py-2">
                                <span class="me-3">
                                    <img src="imgs/icon-umberella.png" alt="">
                                    20%
                                </span>
                                <span class="me-3">
                                    <img src="imgs/icon-wind.png" alt="">
                                    18Km/h
                                </span>
                                <span>
                                    <img src="imgs/icon-compass.png" alt="">
                                    East
                                </span>
                            </div>`

    today.innerHTML = cartona;

}

function displayTom(tomDay) {
    var cartona = `  <div class="tomorrow-header d-flex justify-content-center p-2">
                            <div class="day">${convertDate(tomDay.date)[0]}</div>
                        </div>
                        <div class="tomorrow-content d-flex flex-column justify-content-center align-items-center">
                            <div class="tomorrow-img pt-5">
                                <img src="https:${tomDay.day.condition.icon}" alt="" class="pt-2">
                            </div>
                            <div class="tomorrow-info pt-4">
                                <div>
                                    <p class="fw-bold fs-4 text-white">${tomDay.day.maxtemp_c}<sup>o</sup>C</p>
                                </div>
                                <span class="ps-3">${tomDay.day.mintemp_c}<sup>o</sup>C</span>
                            </div>
                            <div class="tomorrow-desc pt-2">
                                <span>Sunny</span>
                            </div>
                        </div>`

    tomorrow.innerHTML = cartona;
}

function displayNext(nextDay) {
    var cartona = ` <div class="next-header d-flex justify-content-center p-2">
                            <div class="day">${convertDate(nextDay.date)[0]}</div>
                        </div>
                        <div class="next-content pt-5 d-flex flex-column justify-content-center align-items-center">
                            <div class="next-img">
                                <img src="https:${nextDay.day.condition.icon}" alt="" class="pt-2">
                            </div>
                            <div class="next-info pt-4">
                                <div>
                                    <p class="text-white fs-4 fw-bold">${nextDay.day.maxtemp_c}<sup>o</sup>C</p>
                                </div>
                                <span class="ps-3">${nextDay.day.mintemp_c}<sup>o</sup>C</span>
                            </div>
                            <div class="next-desc pt-2">
                                <span>Sunny</span>
                            </div>
                        </div>`

    next.innerHTML = cartona;
}

function convertDate(x) {
    var day, dayDate;
    var date = new Date(x);
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var arr = date.toString().split(" ");
    if (arr[0] == 'Mon') {
        day = days[0];
    }
    else if (arr[0] == 'Tue') {
        day = days[1];
    }
    else if (arr[0] == 'Wed') {
        day = days[2];
    }
    else if (arr[0] == 'Thu') {
        day = days[3];
    }
    else if (arr[0] == 'Fri') {
        day = days[4];
    }
    else if (arr[0] == 'Sat') {
        day = days[5];
    }
    else if (arr[0] == 'Sun') {
        day = days[6];
    }

    dayDate = arr[2] + " " + arr[1];

    var dateArr = [day, dayDate];
    return dateArr;
}



async function userLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude
            getLocation(lat, lon)
        }),
            function (error) {
                console.log(error)
            }
    }



}

async function getLocation(lat, lon) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e9c0f7c489e4e44bff203248241007&q=` + lat + ',' + lon + `&days=3`);
    var data = await response.json();
    var city = data.location.name;
    var currentDay = data.forecast.forecastday[0];
    var tomDay = data.forecast.forecastday[1];
    var nextDay = data.forecast.forecastday[2];
    displayToday(currentDay, city);
    displayTom(tomDay);
    displayNext(nextDay);

}

userLocation()

