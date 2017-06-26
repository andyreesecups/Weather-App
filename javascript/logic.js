var API_KEY = "3e184155a7e1df31ff9f4e16bb9124d1";
$(function(){
	var loc;
	$.getJSON('http://ipinfo.io', function(d) {
		loc = d.loc.split(",");
		console.log(loc);
		
		// Call the openweathermap.org API
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] +'&lon=' + loc[1] +'&APPID=' + API_KEY, function(wd){
			console.log("got the data,", wd);
			var currentLocation = wd.name;
			var currentWeather = wd.weather[0].description;
			var currentTemp = wd.main.temp;
			var high = wd.main.temp_max;
			var low = wd.main.temp_min;

			$("#currentLocation").html(currentLocation);
			$("#currentTemp").html(currentTemp);
			$("#currentWeather").html(currentWeather);
			$("#high-low").html(high + "/" + low);



		});


	});
});