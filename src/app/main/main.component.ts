import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isCollapsed = true
  user: User

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.usuario.subscribe(user => {
      this.user = user
      let id = this.user.uid
      this.router.navigate(['/main/profile', { id: id}])
      
    })
  }

  signOut() {
    this.authService.logout().catch(e=>{ alert(`ocuurrió un error al cerrar la sesión: ${e.message}`) })
                             .then(()=>{ this.router.navigate(['/login']); localStorage.clear()})
    }

}
