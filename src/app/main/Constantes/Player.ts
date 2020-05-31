import { Game } from './Game'
import { Pay_Account } from './Pay_Account'

/**
 * Declaro el objeto Jugador
 */
export class Player {

    id: string // generado automaticamente por firebase
    name: string
    age: number // edad en años
    email: string
    nickname: string // nombre visual para todos los usuarios, debe ser único
    phone: string// único para cada cuenta
    balance: number // oro ejm 300 de oro o 300 monedas de oro
    date_addm: Date
    url_photo: string
    platform_to_play: string // PS4, XBOXONE, PC
    games: [Game] // FIFA20, FIFA19, PES20, PES19
    matches: [string] // almacena las referencias de las partidas jugadas
    pay_account: Pay_Account
    profile_complete: boolean = false
    email_verified: boolean = false

    constructor() {}
}