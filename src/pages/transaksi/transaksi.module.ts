import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransaksiPage } from './transaksi';

@NgModule({
  declarations: [
    TransaksiPage,
  ],
  imports: [
    IonicPageModule.forChild(TransaksiPage),
  ],
})
export class TransaksiPageModule {}
