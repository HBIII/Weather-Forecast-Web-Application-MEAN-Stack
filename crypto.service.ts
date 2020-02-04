import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
	
  private modalSource = new BehaviorSubject<object>({});
  public dataModal1 = this.modalSource.asObservable();	

  constructor(private http: HttpClient) {}

  myData1(street,city,state){
  	var x = street;
  	var x1 = encodeURIComponent(x);
  	var y = city;
  	var y1 = encodeURIComponent(y);
  	var z = state;
  	var z1 = encodeURIComponent(z);
  	return this.http.get("http://localhost:8000/geolocation/"+x1+"/"+y1+"/"+z1);
  }

  myData2(lat, long){
  	return this.http.get("http://localhost:8000/darkSky/"+lat+"/"+long);
  }

  myData3(state){
  	return this.http.get("http://localhost:8000/imgPath/"+state);
  }

  myData4(){
  	return this.http.get("http://localhost:8000/IPdata");
  }

  myData5(lat,long,time){
  	return this.http.get("http://localhost:8000/modalData/"+lat+"/"+long+"/"+time);
  }

  myData6(city){
  	return this.http.get("http://localhost:8000/autocomplete/"+city);
  }


  public fix(t){
  	this.modalSource.next(t);
  }
}
