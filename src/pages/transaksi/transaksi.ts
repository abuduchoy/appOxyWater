import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { global } from '../home/global';

@IonicPage()
@Component({
  selector: 'page-transaksi',
  templateUrl: 'transaksi.html',
})
export class TransaksiPage {

  todo = {}
  obj:any;

  access:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.storage.get('myStore').then((val)=>{
      this.showTransaksi(val);
    });
    
  } // end const...
  
  showTransaksi(id){
    
    var url = global.url('transaksi&id=' + id);
    
    // console.log(url);

    this.http.get(url)
      .map( res => res.json())
      .subscribe( data => {
        this.todo = data.result;
        // console.log(data.result);
        if(this.todo['id_transaksi'] == 0 ) {
          this.access = false;
          // console.log(this.access);
        } else {    
          this.access = true;
          this.obj = Object.keys(this.todo);

        }
        
        
        for(let i=0; i < this.obj.length; i++){
          var r = this.todo[i].total.split('+');
          // console.log(r);
          this.todo[i].total = r[2];
        }

        // var t = this.todo['total'];
        
        // var z = {};
        // z = t.split('+');
        console.log(this.todo);
        
      })
  } // end funct...

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaksiPage');
  }

  refreshPage(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
