import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  email: string
  pass: string
  pass2: string
  constructor( private toast: ToastrService, private authService: AuthService) { }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  /**
   * verifica que sea un email
   * @param search email
   */
  isEmail(search: string): boolean {

    if (search === undefined ) return false

    let  serchfind: boolean;

    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    serchfind = regexp.test(search);
    return serchfind;
  }

  isPassCorrect(pass: string, pass2: string): boolean {
    if (pass === pass2) return true;
    else return false;
  }

  /**
   * verificar contrasenas iguales
   * @param e input
   */
  verifPassRep(e) {
  if ( e.value === '') {
    e.style.outline = '0px solid red';
  } else if (e.value !== this.pass) {
    e.style.outline = '2px solid red';
  } else {
    e.style.outline = '0px solid red';
  }
  }

  singUp(email: string, pass: string, pass2: string) {    
    if (this.isEmail(email)) {
      if (this.isPassCorrect(pass, pass2)) {
        this.authService.signUp(email, pass).then(() => {
          this.toast.success('registrado exitosamente', 'Bienvenido a AurumGamer')
        }).catch(err => {          
          this.toast.error(err, 'Intente Nuevamente')        
        })
      } else { this.toast.error('Las contraseñas no son iguales', 'Password') }
    } else { this.toast.error('Escriba un email válido', 'Email') }
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

}
