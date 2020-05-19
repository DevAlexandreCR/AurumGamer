import { Component, OnInit } from '@angular/core';
import { Player } from '../Constantes/Player';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/player/player.service';
import { Observable, observable, Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isCollapsed = true
  player: Player
  isEditing: boolean = false
  errorProfile: string
  errorDataProfile: boolean = false

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private toast: ToastrService) {
    this.player = new Player()
    this.player.nickname = 'MiImponenteNickName'
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    let id = this.route.snapshot.params.id
    this.getPlayer(id).then(player => {
      this.player = player
    }).catch(e => {
      this.errorDataProfile = true
    })
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  getPlayer(id: string): Promise<Player> {
    return new Promise((res,rej) => {
      this.playerService.getPlayerById(id).valueChanges()
      .subscribe(player => {
        res(player)
      })
      rej(new Error("Algo salio mal!!"))
    })
  } 

  saveProfile(player: Player) {
    if(this.isDataProfileComplete(player)){
      this.playerService.updatePlayer(player)
      .then(()=>{
        this.toast.success('Tu perfil ha sido actualizado correctamente')
      })
      .catch( e => {
        this.toast.error(e.message, e.code)
      })
    }
  }

  isDataProfileComplete(player: Player): boolean {
    if (player.age < 15) { return false}
    else if (player.name === undefined || player.name.length < 6) {this.toast.error('Ingresa tu nombre completo', 'Nombre no válido'); return false}
    else if (!this.verifyNickName(player.nickname)) { this.toast.error('NickName no válido o ya en uso', 'NickName no válido'); return false}
    else if (player.phone === undefined || player.phone.length > 10 || player.phone.length < 10) { this.toast.error('Ingresa un número de teléfono válido', 'Teléfono no válido'); return false}
    else { return true}
  }

  verifyNickName(nick: string): boolean {
    return true
  }

}
