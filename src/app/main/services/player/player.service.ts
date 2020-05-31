import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { Player } from '../../Constantes/Player';
import { Constantes } from '../../Constantes/Constantes';
import { Pay_Account } from '../../Constantes/Pay_Account';
import { PaymentRquest } from '../../Constantes/PaymentRquest';


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
    return this.afs.doc<Player>(`player/${id}`)
  }

  updatePlayer(player: Player) {
    this.player_doc = this.afs.doc<Player>(`${Constantes.PLAYER_COLLECTION}/${player.id}`)
    return this.player_doc.set( Object.assign({}, player), {merge: true} )
  }

  addPaymentRequets(paymentRequest: PaymentRquest) {
    const id = this.afs.createId()
    paymentRequest.id = id
    paymentRequest.date_add = new Date()
    paymentRequest.state = Constantes.STATE_PAYMENT_PENDING
    const payColllection = this.afs.collection<PaymentRquest>(Constantes.PAYMENTS_REQUEST)
    return payColllection.doc(id).set(Object.assign({}, paymentRequest))
  }

  getPendingPayments(player_id: string){
    let coll = this.afs.collection<PaymentRquest>(Constantes.PAYMENTS_REQUEST).ref
    return coll.where('player.id','==', player_id).where('state', '==', Constantes.STATE_PAYMENT_PENDING).get()
  }

  getDefault(constant: string) {
    switch (constant){
      case Constantes.COLL_PAY_ACCOUNT_DEFAULT:
        return this.afs.doc<Pay_Account>(`${Constantes.COLLECTION_DEFAULTS}/${Constantes.COLL_PAY_ACCOUNT_DEFAULT}`)
      break
    }
  }
}
