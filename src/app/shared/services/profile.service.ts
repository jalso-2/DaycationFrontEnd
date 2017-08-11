import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config';

@Injectable()
export class ProfileService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public preferences: string;

  constructor(
    public http: Http,
    public config: Config,
  ) {
    this.http = http;
    this.config = config;
  }
  public addPreferences(events: Array<String>, foods: Array<String>, moves: Array<String>): Promise<string> {
    const body = {
      userId: JSON.parse(localStorage.getItem('user'))[0].id,
      prefs: [{ events }, { foods }, { moves}]
    };
    return this.http
      .post(`${this.config.serverUrl}/addpreferences`, body)
      .map(user => {
        this.preferences = JSON.parse(user['_body']).length ?
          JSON.parse(user['_body'])[0].preferences : JSON.stringify(['Error adding user preferences.']);
        if (!JSON.parse(user['_body']).length) {
          return this.preferences;
        } else {
          let tempUser = JSON.parse(localStorage.getItem('user'))[0];
          tempUser.preferences = JSON.parse(user['_body'])[0].preferences;
          localStorage.setItem('user', JSON.stringify([tempUser]));
          return this.preferences;
        }
      }).toPromise().then(prefs => JSON.stringify(prefs));
  }
}
