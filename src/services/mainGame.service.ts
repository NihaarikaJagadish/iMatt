import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {Config} from '../config/Config';

@Injectable({
    providedIn: 'root'
})
export class MainGame {
    baseUri = Config.mainGameUrl;

    constructor(private http: HttpClient) {}

    mainGame(data){
        return this.http.post(`${this.baseUri}`, data)
    }
    
}
