import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {Config} from '../config/Config';

@Injectable({
    providedIn: 'root'
})
export class FirstForm {
    baseUri = Config.firstFormUrl;

    constructor(private http: HttpClient) {}

    firstForm(data){
        return this.http.post(`${this.baseUri}`, data)
    }
    
}
