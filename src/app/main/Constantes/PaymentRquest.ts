import { Pay_Account } from './Pay_Account';
import { Player } from './Player';

export class PaymentRquest {

    id: string
    pay_account: Pay_Account
    previus_balance: number
    cash: number
    player: Player
    state: string
    date_add: Date
    reason: string

    constructor() {}
}