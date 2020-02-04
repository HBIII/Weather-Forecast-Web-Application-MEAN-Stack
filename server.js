const express = require('express')
var cors = require('cors')
const request = require('request-promise')
const app = express()

var corsOptions = { origin: '*'}

app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log('Server started!')
})

app.route('/geolocation/:street/:city/:state').get((req, res) => {
	var street = req.params['street']
	var city = req.params['city']
	var state = req.params['state']
	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var url1 = baseUrl+street+",+"+city+",+"+state+"&key=AIzaSyDmhDrp0PG4nWvAOfPmiKN24KmGrSsV-gA"

	var options = {
		methods: "GET",
		url: url1,
		json: true
	}

	request(options).then(function(response){
		var location = response.results[0].geometry.location;
		var lat = location.lat.toString();
		var long = location.lng.toString();
		//console.log(lat)
		//console.log(long)
		res.send({"latitude": lat, "longitude": long})
	})
});

app.route('/darkSky/:lat/:long').get((req, res) => {
	var lat1 = req.params['lat']
	var long1 = req.params['long']
	var url1 = "https://api.forecast.io/forecast/297ea87061d9a1983ffc384495799fc4/"+lat1+","+long1;

	var options = {
		methods: "GET",
		url: url1,
		json: true
	}

	request(options).then(function(response){
	//console.log(response);
	//console.log(lat)
	//console.log(long)
	res.send(response)
	})
});

app.route('/imgPath/:state').get((req, res) => {
	var state = req.params['state']
	var url1 = "https://www.googleapis.com/customsearch/v1?q="+state+"%20State%20Seal&cx=013278869649303817772:ctjurqkww4w&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyDmhDrp0PG4nWvAOfPmiKN24KmGrSsV-gA";
	var options = {
		methods: "GET",
		url: url1,
		json: true
	}

	request(options).then(function(response){
	var img = response.items[0].link;
	//console.log(img);
	//console.log(lat)
	//console.log(long)

	res.send({"img":img})
	})
});

app.route('/IPdata').get((req, res) => {
	var url1 = "http://ip-api.com/json/";

	var options = {
		methods: "GET",
		url: url1,
		json: true
	}

	request(options).then(function(response){
	//console.log(response);
	//console.log(lat)
	//console.log(long)
	var lat = response.lat.toString();
	var long = response.lon.toString();
	var state = response.region;
	var city = response.city;
	//console.log(long)
	res.send({"latitude": lat, "longitude": long, "state": state, "city": city})
	})
});

app.route('/modalData/:lat/:long/:time').get((req, res) => {
	var lat = req.params['lat']
	var long = req.params['long']
	var time = req.params['time']
	var url1 = "https://api.darksky.net/forecast/297ea87061d9a1983ffc384495799fc4/"+lat+","+long+","+time;

	var options = {
		methods: "GET",
		url: url1,
		json: true
	}

	request(options).then(function(response){
	//console.log(long)
	res.send(response)
	})
});

app.route('/autocomplete/:city').get((req, res) => {
	var c1 = req.params['city']
	var url1 = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+c1+"&types=(cities)&language=en&key=AIzaSyDmhDrp0PG4nWvAOfPmiKN24KmGrSsV-gA";
	var options = {
		methods: "GET",
		url: url1,
		json: true
	}

	request(options).then(function(response){
	//console.log(long)
	res.send(response)
	})
});