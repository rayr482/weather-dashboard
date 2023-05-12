localStorage.clear();
var apiKey = '3ab465212cd66bf0d2eb61e9e8abcb78';
var cityID = $('#city');
var cityListID = $('#city-list');

var getCity = function() {
    var cityInput = uppercaseCity($('#city')[0].value.trim());
    var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=' + apiKey;

    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        $(cityID)[0].textContent = cityInput + ' (' + dayjs().format('M/D/YYYY') + ')';
                        $(cityListID).append('<button type="button" class="list-group-item-light list-group-item-action city-name>' + cityInput);

                        var lat = data.coord.lat;
                        var lon = data.coord.lon;
                        var latlon = lat.toString() + ' ' + lon.toString();

                        localStorage.setItem(cityInput, latlon);

                        apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey;
                        
                        fetch(apiURL)
                            .then(function(response2) {
                                if (response2.ok) {
                                    response2.json()
                                        .then(function(data2) {
                                            console.log(data2);
                                            getPresentConditions(data2);
                                        })
                                }
                            })
                    })
            } else {
                return;
            }
        })
};

var getCityList = function(location) {
    apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + location[0] + '&lon=' + location[1] + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey;

    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                response.jeson()
                    .then(function (data) {
                        getPresentConditions(data);
                    })
            }
        })
};

var getPresentConditions = function(data) {
    var currentConditionsIcon = $('#current-conditions-icon')[0];
    var temps = $('#temp')[0];
    var hums = $('#hum')[0];
    var winds = $('#wind')[0];

    currentConditionsIcon.src = ' https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
    temps.textContent = 'Temperature: ' + data.list[0].main.temp.toFixed(1) + ' \u2109';
    hums.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
    winds.textContent = 'Wind Speed: ' + data.list[0].wind.speed + ' MPH';

    getFutureConditions(data);
};

var getFutureConditions = function(data) {
    var futureWeather0 = {
        date: data.list[0].dt_txt,
        icon: 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png',
        temp: data.list[0].main.temp.toFixed(1),
        hum: data.list[0].main.humidity
    };

    var Day0 = '#day-0';
    $(Day0)[0].textContent = futureWeather0.date;
    Day0 = '#img-day-0';
    $(Day0)[0].src = futureWeather0.icon;
    Day0 = '#temp-day-0';
    $(Day0)[0].textContent = 'Temperature: ' + futureWeather0.temp + ' \u2109';
    Day0 = '#hum-day-0';
    $(Day0)[0].textContent = 'Humidity: ' + futureWeather0.hum + '%';

    var futureWeather1 = {
        date: data.list[8].dt_txt,
        icon: 'https://openweathermap.org/img/wn/' + data.list[8].weather[0].icon + '@2x.png',
        temp: data.list[8].main.temp.toFixed(1),
        hum: data.list[8].main.humidity
    };

    var Day1 = '#day-1';
    $(Day1)[0].textContent = futureWeather1.date;
    Day1 = '#img-day-1';
    $(Day1)[0].src = futureWeather1.icon;
    Day1 = '#temp-day-1';
    $(Day1)[0].textContent = 'Temperature: ' + futureWeather1.temp + ' \u2109';
    Day1 = '#hum-day-1';
    $(Day1)[0].textContent = 'Humidity: ' + futureWeather1.hum + '%';

    var futureWeather2 = {
        date: data.list[16].dt_txt,
        icon: 'https://openweathermap.org/img/wn/' + data.list[16].weather[0].icon + '@2x.png',
        temp: data.list[16].main.temp.toFixed(1),
        hum: data.list[16].main.humidity
    };

    var Day2 = '#day-2';
    $(Day2)[0].textContent = futureWeather2.date;
    Day2 = '#img-day-2';
    $(Day2)[0].src = futureWeather2.icon;
    Day2 = '#temp-day-2';
    $(Day2)[0].textContent = 'Temperature: ' + futureWeather2.temp + ' \u2109';
    Day2 = '#hum-day-2';
    $(Day2)[0].textContent = 'Humidity: ' + futureWeather2.hum + '%';

    var futureWeather3 = {
        date: data.list[24].dt_txt,
        icon: 'https://openweathermap.org/img/wn/' + data.list[24].weather[0].icon + '@2x.png',
        temp: data.list[24].main.temp.toFixed(1),
        hum: data.list[24].main.humidity
    };

    var Day3 = '#day-3';
    $(Day3)[0].textContent = futureWeather3.date;
    Day3 = '#img-day-3';
    $(Day3)[0].src = futureWeather3.icon;
    Day3 = '#temp-day-3';
    $(Day3)[0].textContent = 'Temperature: ' + futureWeather3.temp + ' \u2109';
    Day3 = '#hum-day-3';
    $(Day3)[0].textContent = 'Humidity: ' + futureWeather3.hum + '%';

    var futureWeather4 = {
        date: data.list[32].dt_txt,
        icon: 'https://openweathermap.org/img/wn/' + data.list[32].weather[0].icon + '@2x.png',
        temp: data.list[32].main.temp.toFixed(1),
        hum: data.list[32].main.humidity
    };

    var Day4 = '#day-4';
    $(Day4)[0].textContent = futureWeather4.date;
    Day4 = '#img-day-4';
    $(Day4)[0].src = futureWeather4.icon;
    Day4 = '#temp-day-4';
    $(Day4)[0].textContent = 'Temperature: ' + futureWeather4.temp + ' \u2109';
    Day4 = '#hum-day-4';
    $(Day4)[0].textContent = 'Humidity: ' + futureWeather4.hum + '%';
};

var uppercaseCity = function(city) {
    var newCity = city.toLowerCase().split(' ');
    var displayCity = '';
    for (var i = 0; i < newCity.length; i++) {
        newCity[i] = newCity[i][0].toUpperCase() + newCity[i].slice(1);
        displayCity += ' ' + newCity[i];
    }
    
    return displayCity;
};

$('#search-button').on('click', function(event) {
    event.preventDefault();

    getCity();

    $('form')[0].reset();
});

$('.city-list-section').on('click', '.city-name', function() {
    var location = (localStorage.getItem($(this)[0].textContent)).split(' ');
    location[0] = parseFloat(location[0]);
    location[1] = parseFloat(location[1]);

    $('#city-name')[0].textContent = $(this)[0].textContent + ' (' + dayjs().format('M/D/YYYY') + ')';

    getCityList(location);
});
