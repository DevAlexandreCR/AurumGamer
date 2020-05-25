import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Player } from '../Constantes/Player';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../services/player/player.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'firebase';
import { Constantes } from '../Constantes/Constantes';
import { StorageService } from '../services/storage/storage.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  isCollapsed = true
  player: Player
  player_whitout_changes: Player
  isEditing: boolean = false
  errorProfile: string
  errorDataProfile: boolean = false
  user: User
  profile_photo: any
  profile_photo_preview: any
  porcentaje: number = 0
  options: AnimationOptions = {
    path: '../../../assets/lottiefiles/charging_data.json',
  };

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private toast: ToastrService,
    private authService: AuthService, private router: Router, private storage: StorageService) {
    this.player = new Player()
    this.player_whitout_changes = new Player()
  }
  ngAfterViewInit(): void {
    /**
     * si viene del login o registro actualiza la pagina porque 
     * si no no se ve el perfil completo en celulares ---> solucionado con
     * el ondestroy del home y quitando la clase index-page del body
     */
    let session = JSON.parse(localStorage.getItem('session'))
    if (session.navigate_from === 'home') {     
      session.navigate_from = 'main' 
      localStorage.setItem('session',JSON.stringify(session))
      // location.reload()
    }
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    let id = this.route.snapshot.params.id
    console.log(id);
    this.getPlayer(id).then(player => {
      if (player === null ) { return;}
      this.player = player
      this.profile_photo_preview = player.url_photo
      this.profile_photo = this.profile_photo_preview
      this.authService.usuario.subscribe(user => {
        if (user === null )  return;
        this.user = user
        this.player.email_verified = user.emailVerified
      })
    }).catch(e => {
      console.log(e);
      this.errorDataProfile = true
    })

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  getPlayer(id: string): Promise<Player> {
    return new Promise((res,rej) => {
      this.playerService.getPlayerById(id).valueChanges()
      .subscribe(player => {
        res(player)
      })
      // rej(new Error("Algo salio mal!!"))
    })
  } 

  saveProfile(player: Player) {
    if(this.isDataProfileComplete(player)){
      this.playerService.updatePlayer(player)
      .then(()=>{
        this.toast.success('Tu perfil ha sido actualizado correctamente')
        this.isEditing =  false
      })
      .catch( e => {
        this.toast.error(e.message, e.code)
      })
    }
  }

  isDataProfileComplete(player: Player): boolean {
    if (player.age < 15) {this.toast.error('Ingresa tu edad', 'Edad no válida'); return false}
    else if (player.name === undefined || player.name.length < 6) {this.toast.error('Ingresa tu nombre completo', 'Nombre no válido'); return false}
    else if (!this.verifyNickName(player.nickname)) { this.toast.error('NickName no válido o ya en uso', 'NickName no válido'); return false}
    else if (player.phone === undefined || player.phone.length > 10 || player.phone.length < 10) { this.toast.error('Ingresa un número de teléfono válido', 'Teléfono no válido'); return false}
    else { return true}
  }

  verifyNickName(nick: string): boolean {
    return true
  }

  sendEmailVerification(user: User) {
    if (user == undefined || user == null) { this.toast.error('Ha ocurrido un error, intenta más tarde'); return }
    else { 
      user.sendEmailVerification().then(()=>{
        this.toast.success('Hemos enviado un correo de verificación', 'Verifica tu bandeja de entrada')
      }).catch(e => {
        this.toast.error(e.message, e.code)
      })
    }
  }

  updateProfilePhoto(player_id: string, photo: any, modal){
    let ruta = `${Constantes.PLAYER_COLLECTION}/${player_id}/${Constantes.PROFILE_PHOTO}`
    this.porcentaje = 1
    let ref = this.storage.getReference(ruta)
    let task = this.storage.upload(ruta, this.profile_photo)
    task.percentageChanges().subscribe(porcentaje => {
      this.porcentaje = Math.round(porcentaje)
      if (this.porcentaje == 100) {
        ref.getDownloadURL().subscribe(url => {
          this.profile_photo = url
          this.playerService.updatePlayer(this.player).then(()=>{
            this.toast.success('Foto actualizada correctamente', ';)')
            modal.hide()
            this.porcentaje = 0
            this.player.url_photo = this.profile_photo
            this.profile_photo_preview = this.profile_photo
          }).catch(e => {
            this.toast.error(e.message, e.code)
            this.porcentaje = 0
          })
        })
      }
    })
  }    

  /** guarda el archivo seleccionado en la variable comprobante */
  selectFile(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.profile_photo = event.target.files[i]  
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[i])
        reader.onload = (e) => {
          this.profile_photo_preview = e.target.result
        }
      }
    }
  }

  isDataProfileChanged(e: any, field: string) {
    this.isEditing = true
  }
}
