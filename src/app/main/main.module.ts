import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from "@angular/fire/storage";
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MainRoutingModule
  ]
})
export class MainModule { }
