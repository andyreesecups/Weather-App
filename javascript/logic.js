var API_KEY = "3e184155a7e1df31ff9f4e16bb9124d1";
var cel = false;
var wd;

function displayTemp(fTemp, c) {
    if (c) return Math.round((fTemp - 32) * (5 / 9)) + "C";
    return Math.round(fTemp) + "F";
}

function render(wd, cel) {
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, cel);
    var high = displayTemp(wd.main.temp_max, cel);
    var low = displayTemp(wd.main.temp_min, cel);
    var icon = wd.weather[0].icon;


    $("#currentLocation").html(currentLocation);
    $("#currentTemp").html(currentTemp);
    $("#currentWeather").html(currentWeather);
    $("#high-low").html(high + "/" + low);

    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";

    $('#currentTemp').prepend('<img src="' + iconSrc + '">');
}

$(function() {
    var loc;
    $.getJSON('http://ipinfo.io', function(d) {
        loc = d.loc.split(",");
        console.log(loc);

        //----------- Call the openweathermap.org API -----------------//
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function(apiData) {

            wd = apiData;

            render(apiData, cel);

            $("#toggle").click(function() {
                cel = !cel;
                render(wd, cel);
            });
        });


    });
});
