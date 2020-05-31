import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  constructor() { }
  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }



  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }


}
