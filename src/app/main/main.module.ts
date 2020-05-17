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


@NgModule({
  declarations: [ProfileComponent, MainComponent],
  imports: [
    FormsModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    AngularFireStorageModule,
    AngularFirestoreModule,
    MainRoutingModule
  ]
})
export class MainModule { }
