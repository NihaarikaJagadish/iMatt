import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {Config} from '../config/Config';

@Injectable({
    providedIn: 'root'
})
export class Login {
    baseUri = Config.loginUrl;

    constructor(private http: HttpClient) {}

    login(data){
        return this.http.post(`${this.baseUri}`, data)
    }
    
}
