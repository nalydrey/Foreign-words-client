import { Settings } from "./settingModel"




export interface UserModel {
    id: number
    nikName: string 
    role: 'user' | 'admin' 
    password: string 
    settings: Settings
}