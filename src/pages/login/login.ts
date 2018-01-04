import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Md5 } from './md5';
import { global } from '../home/global';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	public registrationForm: FormGroup;
	setData;
	//tabsPage : TabsPage;
	//public tabsPage: TabsPage;
	id: any;
	constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public storage: Storage, public formBuilder: FormBuilder) {
		this.registrationForm = this.formBuilder.group({
			"username": ["", Validators.compose([
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(25),
				Validators.pattern('^[a-zA-Z\. ]+$')
			])],

			"password": ["", Validators.compose([
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(50),
				Validators.pattern('^[a-zA-z\. ]+$')
			])]
		});
		// Cek auntetikasi dari database
		this.storage.get('myStore').then((data) => {
			if (data != null) {
				this.navCtrl.push(TabsPage);
				window.location.reload();
			}
		});
	}

	logForm() {
		this.setData = this.registrationForm.value;

		let e = Md5(this.setData.password);

		var url = global.url('cekLoginAdmin&id=' + e);

		this.http.get(url).map(res => res.json()).subscribe(data => {
			console.log(data.result);
			if (data.result[0].id == 0) {
				console.log("Anda belum terdaftar");
			} else {
				this.storage.get('myStore').then((val) => {

					let array = [];
					array.push(data.result[0].md5);
					this.id = array[0];
					this.storage.set('myStore', this.id);
					this.navCtrl.push(TabsPage);
				});
			}
		});

	}

	saveLogin(user, pass) {
		console.log(user);
		console.log(pass);
	}

	goSignup() {
		this.navCtrl.push(SignupPage);
	}

	// ionViewDidLoad() {
	//   console.log('ionViewDidLoad LoginPage');
	// }

}
