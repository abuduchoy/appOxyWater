import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesanPage } from './pesan';

@NgModule({
  declarations: [
    PesanPage,
  ],
  imports: [
    IonicPageModule.forChild(PesanPage),
  ],
})
export class PesanPageModule {}
