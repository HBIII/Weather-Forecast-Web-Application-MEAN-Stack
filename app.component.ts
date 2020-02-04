import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { CryptoService } from './crypto.service';
import { Observable } from 'rxjs/Observable';
import * as CanvasJS from './canvasjs.min';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
  search1 : FormGroup;
  constructor (private fb: FormBuilder, private myData: CryptoService, private ngb: NgbModal){}

  public toggle: boolean = false;
  public tabCheck: boolean = false;
  public progressbool: boolean = false;
  public street: String;
  public city: String;
  public state: String;
  public geoLocation: any;
  public lat: String;
  public long: String;

  public darkData: any = {};
  public imgData: any;
  public IPdata: any;
  public imgSeal: String;
  public modalData: any;
  public dataModal1: any = {};
  
  public timezone: String;
  public humidity: number = 0;
  public windspeed: number = 0;
  public ozone: number = 0;
  public temperature: any;
  public pressure: number = 0;
  public visibility: number = 0;
  public cloudcover: number = 0;
  public summary: any;
  public imgPath: any;

  public arrTime: number[] = [];
  public arrHumidity: number[] = [];
  public arrWindspeed: number[] = [];
  public arrOzone: number[] = [];
  public arrTemperature: number[] = [];
  public arrPressure: number[] = [];
  public arrVisibility: number[] = [];

  public barChartData: any;
  public barChartLabels: String[] = [];
  public barChartOptions: any;
  public barChartLegend: boolean;
  public barChartType: String; 

  public suggestions;
  public autocomp1: any;

  public weekly: any = [];

  public imgUrl: string[] = [
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png', 
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png', 
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png',
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png',
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png',
  			'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png',
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png',
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png',
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png',
  			'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png'];

  public imgMap: string[] = ['clear-day','clear-night','rain','snow','sleet','wind','fog',
 															'clody','partly-cloudy-day','partly-cloudy-night'];

  ngOnInit(){
  	this.search1 = this.fb.group({
  	street: ['', Validators.required],
  	city: ['', Validators.required],
  	state: ['', Validators.required],
  	check1: []
  	});

  	this.createForm();

  	this.myData.dataModal1.subscribe(res => {this.dataModal1 = res});

  }

  createForm(){

  if(this.toggle){
  	this.search1 = this.fb.group({
  	street: [this.search1.get('street').value],
  	city: [this.search1.get('city').value],
  	state: [this.search1.get('state').value],
  	check1: ['checked']
  	});
  }
  else{
	  	this.search1 = this.fb.group({
	  	street: [this.search1.get('street').value, Validators.required],
	  	city: [this.search1.get('city').value, Validators.required],
	  	state: [this.search1.get('state').value, Validators.required],
	  	check1: []
  	});
  }
  }

  valid1(event){
    if(event.target.checked){
      this.toggle = true;

      this.search1.controls['street'].disable();
      this.search1.controls['city'].disable();
      this.search1.controls['state'].disable();
    } 
    else {
      this.toggle = false;

      this.search1.controls['street'].enable();
      this.search1.controls['city'].enable();
      this.search1.controls['state'].enable();
    }

    this.createForm();
  }

  clear(){
  	if(this.toggle)
  	{
	  	this.search1.controls['street'].enable();
	    this.search1.controls['city'].enable();
	    this.search1.controls['state'].enable();  	
  	}

  	this.toggle = false;
  	this.createForm();
  	
  	this.search1.get('check1').setValue('');
  	this.search1.get('street').setValue('');
  	this.search1.get('city').setValue('');
  	this.search1.get('state').setValue('');
  	this.darkData = {};
  }

  getJson(){
  	this.darkData = {};
  	this.progressbool = true;
  	this.weekly = [];
  	if(this.toggle)
  	{
  		this.myData.myData4()
	    .subscribe(res => {this.IPdata = res},
	    error => {console.log(error)},
	    () => {
	    	this.lat = this.IPdata.latitude;
	    	this.long = this.IPdata.longitude;
	    	this.state = this.IPdata.state;
	    	this.city = this.IPdata.city;
	  		//console.log(this.IPdata);

	  		this.getImg(this.state);
	  		this.getDarkData(this.lat, this.long);
	  		
	    });
  	}
  	else{
	  	this.street = this.search1.controls['street'].value;
	  	this.city = this.search1.controls['city'].value;
	  	this.state = this.search1.controls['state'].value;
	  	this.myData.myData1(this.street, this.city, this.state)
	    .subscribe(res => {this.geoLocation = res},
	    error => {console.log(error)},
	    () => {
	    	this.lat = this.geoLocation.latitude;
	    	this.long = this.geoLocation.longitude;
	  		//console.log(this.geoLocation);

	  		this.getImg(this.state);
	  		this.getDarkData(this.lat, this.long);
	  		
	    });
	}
  }

  getDarkData(lat1,long1){

  	this.myData.myData2(lat1, long1)
    .subscribe(res => {this.darkData = res},
    error => {console.log(error)},
    () => {
  		//console.log(this.darkData);
  		
  		this.timezone = this.darkData.timezone;
  		this.temperature = this.darkData.currently.temperature;
  		this.windspeed = this.darkData.currently.windSpeed;
  		this.ozone = this.darkData.currently.ozone;
  		this.pressure = this.darkData.currently.pressure;
  		this.humidity = this.darkData.currently.humidity;
  		this.cloudcover = this.darkData.currently.cloudCover;
  		this.visibility = this.darkData.currently.visibility;
		this.summary = this.darkData.currently.summary; 

		for(var i = 0; i < 24; i++){
			this.arrTime[i] = this.darkData.hourly.data[i].time;
			this.arrTemperature[i] = this.darkData.hourly.data[i].temperature.toFixed(2);
			this.arrPressure[i] = this.darkData.hourly.data[i].pressure.toFixed(2);
			this.arrHumidity[i] = (this.darkData.hourly.data[i].humidity)*100;
			this.arrWindspeed[i] = this.darkData.hourly.data[i].windSpeed.toFixed(2);
			this.arrOzone[i] = this.darkData.hourly.data[i].ozone.toFixed(2);
			this.arrVisibility[i] = this.darkData.hourly.data[i].visibility.toFixed(2);
		}

		for(var i = 0; i<8; i++){
			let temp: any = {};
			let temparr: number[] = [];
			var currTime = this.darkData.daily.data[i].time;
			var date = new Date(currTime*1000);
			var stringDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

			temparr[0] = Math.round(this.darkData.daily.data[i].temperatureLow);
			temparr[1] = Math.round(this.darkData.daily.data[i].temperatureHigh);

			temp = {y: temparr, label: stringDate};
			this.weekly.push(temp);
		}

		this.loadHourly();

		this.progressbool = false;
		

    });
  }

  getImg(state1){
  	this.myData.myData3(state1)
    .subscribe(res => {this.imgData = res},
    error => {console.log(error)},
    () => {
  		this.imgSeal = this.imgData.img; 		
    });
  }

  loadHourly(){
  	this.barChartOptions = 
  	{
  		legend: {
  			onClick: (e)=>e.stopPropagation()
  		},
  		scaleShowVerticalLines: false,
    	responsive: true,
    	scales: {
    	yAxes: [{
    		scaleLabel: {
    			display: true,
    			labelString: 'Farhenheit'
    		}
    	}],

    	xAxes: [{
    		scaleLabel: {
    			display: true,
    			labelString: 'Time difference from current hour'
    		}
    	}]   	
    	}
  	};

  	this.barChartLabels = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

  	this.barChartType = 'bar';

  	this.barChartLegend = true;

  	this.barChartData = [
  		{data: this.arrTemperature, label: 'Temperature', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  	];
  }

  chartData(hourly)
  {
	if(hourly == 'pressure')
	{
		this.barChartOptions = 
  		{	
  			legend: {
  				onClick: (e)=>e.stopPropagation()
  			},
	  		scaleShowVerticalLines: false,
	    	responsive: true,
	    	scales: {
	    	yAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Millibars'
	    		}
	    	}],

	    	xAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Time difference from current hour'
	    		}
	    	}]   	
	    	}
  		};

  		this.barChartData = [
  			{data: this.arrPressure, label: 'Pressure', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  		];
	}

	else if(hourly == 'humidity')
	{
		this.barChartOptions = 
  		{	
  			legend: {
  				onClick: (e)=>e.stopPropagation()
  			},
	  		scaleShowVerticalLines: false,
	    	responsive: true,
	    	scales: {
	    	yAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: '%'
	    		}
	    	}],

	    	xAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Time difference from current hour'
	    		}
	    	}]   	
	    	}
  		};

  		this.barChartData = [
  			{data: this.arrHumidity, label: 'Humidity', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  		];
	}

	else if(hourly == 'ozone')
	{
		this.barChartOptions = 
  		{	
  			legend: {
  				onClick: (e)=>e.stopPropagation()
  			},
	  		scaleShowVerticalLines: false,
	    	responsive: true,
	    	scales: {
	    	yAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Dobson Units'
	    		}
	    	}],

	    	xAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Time difference from current hour'
	    		}
	    	}]   	
	    	}
  		};

  		this.barChartData = [
  			{data: this.arrOzone, label: 'Ozone', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  		];
	}

	else if(hourly == 'windspeed')
	{
		this.barChartOptions = 
  		{	
  			legend: {
  				onClick: (e)=>e.stopPropagation()
  			},
	  		scaleShowVerticalLines: false,
	    	responsive: true,
	    	scales: {
	    	yAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Miles Per Hour'
	    		}
	    	}],

	    	xAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Time difference from current hour'
	    		}
	    	}]   	
	    	}
  		};

  		this.barChartData = [
  			{data: this.arrWindspeed, label: 'Wind Speed', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  		];
	}

	else if(hourly == 'visibility')
	{
		this.barChartOptions = 
  		{	
  			legend: {
  				onClick: (e)=>e.stopPropagation()
  			},
	  		scaleShowVerticalLines: false,
	    	responsive: true,
	    	scales: {
	    	yAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Miles'
	    		}
	    	}],

	    	xAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Time difference from current hour'
	    		}
	    	}]   	
	    	}
  		};

  		this.barChartData = [
  			{data: this.arrVisibility, label: 'Visibility', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  		];
	}

	else
	{
		this.barChartOptions = 
  		{	
  			legend: {
  				onClick: (e)=>e.stopPropagation()
  			},
	  		scaleShowVerticalLines: false,
	    	responsive: true,
	    	scales: {
	    	yAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Farhenheit'
	    		}
	    	}],

	    	xAxes: [{
	    		scaleLabel: {
	    			display: true,
	    			labelString: 'Time difference from current hour'
	    		}
	    	}]   	
	    	}
  		};

  		this.barChartData = [
  			{data: this.arrTemperature, label: 'Temperature', backgroundColor: '#80C1EB', hoverBackgroundColor: '#4E83A5'}
  		];
	}
  }

  loadWeekly(){
  		let chart = new CanvasJS.Chart("chartContainer",{
  		animationEnabled: true,
  		dataPointWidth: 15,
  		legend: {
  			verticalAlign: "top",
  			horizontalAlign: "top"
  		},
  		title: {
  			text: "Weekly Weather"
  		},
  		axisX: {
  			title: "Days"
  		},
  		axisY: {
  			includeZero: false,
  			title: "Temperature in Farhenheit",
  			interval: 10,
  			gridThickness: 0
  		},
  		data: [{
  			color: "#89CCF9",
  			showInLegend: true,
  			click: onclick,
  			type: "rangeBar",
  			indexLabel: "{y[#index]}",
  			legendText: "Day wise temperature range",
  			toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
  			dataPoints: this.weekly
  		}]
  	});

  	setTimeout(function(){
  		chart.render();
  	}, 100);

  	let dData = this.darkData;
  	let lat1 = this.lat;
  	let long1 = this.long;
  	let mD = this.myData;
  	let mImgUrl = this.imgUrl;
  	let mImgMap = this.imgMap;

  	function onclick(e) {
  		let time = dData.daily.data[e.dataPoint.x].time;
  		mD.myData5(lat1, long1, time).subscribe(res => {this.modalData = res},
   		error => {console.log(error)},
    () => {

    	var obj:any={};
    	var currTime = this.modalData.daily.data[0].time;
		var date = new Date(currTime*1000);
		var modalDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
		
		var modalTemp = this.modalData.currently.temperature;
		
		var modalSummary = this.modalData.currently.summary;
		
		var icon = this.modalData.currently.icon;
		var index = mImgMap.indexOf(icon);
		var modalIcon = mImgUrl[index];

		var modalPrecip = this.modalData.currently.precipIntensity.toFixed(2);
		var modalCOR = (this.modalData.currently.precipProbability)*100;
		var modalWS = this.modalData.currently.windSpeed.toFixed(2);
		var modalHum = (this.modalData.currently.humidity)*100;
		var modalVis = this.modalData.currently.visibility;

		this.dataModal1 = {'img': this.modalIcon, 'temp': this.modalTemp, 'sum': this.modalSummary, 'date': this.modalDate,
		'precip': this.modalPrecip, 'cor': this.modalCOR, 'ws': this.modalWS, 'hum': this.modalHum, 'vis': this.modalVis};
		mD.fix(this.dataModal1);
		//console.log(obj);
		//.log(this.modalHum);
		document.getElementById("modalBtn").click();
		
    });

  }
}

	autocomp(){
		if(this.search1.get('city').value == '')
		{
			this.suggestions = [];
		}
		else{
			let arrTemp: Array<String> = [];
			this.myData.myData6(this.search1.get('city').value).subscribe(res => {this.autocomp1 = res},
   		error => {console.log(error)},
    	() => {
    			console.log(this.autocomp1);

    			if(this.autocomp1.hasOwnProperty("Error"))
    			{
    				this.suggestions = [];
    			}
    			else{
    				let tempCount = Math.min(this.autocomp1.predictions.length,5);
    				for(let i=0;i<tempCount;i++)
    				{
    					arrTemp.push(this.autocomp1.predictions[i].structured_formatting.main_text);
    				}
    			this.suggestions = arrTemp;
    			}
    		});
		}
	}

}
