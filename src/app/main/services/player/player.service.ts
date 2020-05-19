import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { Player } from '../../Constantes/Player';
import { Constantes } from '../../Constantes/Constantes';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player_collection: AngularFirestoreCollection<Player>
  player_doc: AngularFirestoreDocument<Player>


  constructor(private afs: AngularFirestore) { }

  /**
   * funcion devuelve una observable de jugadores
   */
  getPlayersCollection() {
    return this.player_collection = this.afs.collection<Player>('player')
  }

  /**
   * Funcion que retorna un jugador
   * @param id id de firebase 
   */
  getPlayerById(id: string) {
    return this.player_doc = this.afs.doc<Player>(`player/${id}`)
  }

  updatePlayer(player: Player) {
    this.player_doc = this.afs.doc<Player>(`${Constantes.PLAYER_COLLECTION}/${player.id}`)
    return this.player_doc.update( Object.assign({}, player) )
  }
}
