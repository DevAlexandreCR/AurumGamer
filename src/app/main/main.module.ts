import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from "@angular/fire/storage";
import { MainRoutingModule } from './main-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { AlertModule } from "ngx-bootstrap/alert";
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { PaymentsComponent } from './payments/payments.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [ProfileComponent, MainComponent, PaymentsComponent],
  imports: [
    FormsModule,
    CommonModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    LottieModule.forRoot({ player: playerFactory }),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    AngularFireStorageModule,
    AngularFirestoreModule,
    MainRoutingModule
  ]
})
export class MainModule { }
