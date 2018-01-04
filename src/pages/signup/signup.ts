import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { TabsPage } from '../tabs/tabs';
import { Md5 } from '../login/md5';
import { global } from '../home/global';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	nama: string;
	telp: string;
	username: string;
	password: string;

  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  }

  insertDataPelanggan(){
  	var headers = new Headers();

  	headers.append('Content-Type', 'application/x-www-form-urlencoded');
  	let options = new RequestOptions({ headers:headers});

  	//let e = Md5(this.setData.password);

  	let postParams = {
  		nama : this.nama,
  		telp : this.telp,
  		username : this.username,
  		password : this.password,
  		md5 : Md5(this.password)
  	};

		var url = global.url('insertPelanggan');
		
  	this.http.post(url, JSON.stringify(postParams), options)
  		.subscribe( data => {
  			//console.log(data['_body']);
  			//console.log(postParams['md5']);
  			
  			this.storage.get('myStore').then((val) => {
		    
		      let array = [];
		      array.push(postParams['md5']);
		      this.storage.set('myStore', array);
		    	this.navCtrl.push(TabsPage);
		  });
  			//this.navCtrl.push(TabsPage);

  		}, error => {
  			console.log(error); // getting the data
  		} );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
