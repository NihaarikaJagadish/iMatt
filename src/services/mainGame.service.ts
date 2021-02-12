import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {Config} from '../config/Config';

@Injectable({
    providedIn: 'root'
})
export class MainGame {
    baseUri = Config.mainGameUrl;

    constructor(private http: HttpClient) {}

    mainGame(){
        return this.http.get(`${this.baseUri}`,{ 
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Token ' + localStorage.getItem("user")
            }
        })
    }
    
}
