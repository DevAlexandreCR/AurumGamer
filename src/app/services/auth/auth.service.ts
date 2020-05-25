/**
 * Serivcio para la gestion de autenticación
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Observable<User>;
  isLogin: boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.usuario = afAuth.authState;
    this.usuario.subscribe(authState => {
      if (authState) {
       this.isLogin = true
       this.router.navigate(['/main/'])
      }
    });
    }

  login(textemail, textpass) {
    return this.afAuth.signInWithEmailAndPassword(textemail, textpass);
    }

  signUp(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword( email,  pass )
  }

  logout() {
    return this.afAuth.signOut();
    }
  
  passwordReset(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
  }

  
}
