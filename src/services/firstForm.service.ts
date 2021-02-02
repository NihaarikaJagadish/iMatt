import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {Config} from '../config/Config';

@Injectable({
    providedIn: 'root'
})
export class FirstForm {
    baseUri = Config.firstFormUrl;
    responseUrl = Config.responseUrl;

    constructor(private http: HttpClient) {}

    firstForm(){
        return this.http.get(`${this.baseUri}`, { 
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Token ' + localStorage.getItem("user")
            }
        })
    }

    submitResponse(data){
        return this.http.post(`${this.responseUrl}`,data,{
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Token ' + localStorage.getItem("user")
            }
        });
    }
}
