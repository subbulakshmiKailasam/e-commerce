import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


    hostURL = 'http://localhost:3000/user/';
    token = ''

    constructor(private http: HttpClient) { }

    createUser(user: any) {
        return this.http.post(this.hostURL + 'createUser', user)
    }

    getUser(user: any) {
        return this.http.get(this.hostURL + `loginUser`, user)
    }





}
