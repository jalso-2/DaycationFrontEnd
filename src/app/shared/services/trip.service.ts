import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../../config';

@Injectable()
export class TripService {
  public events: Array<String>;
  public mappedEvents: Array<Object>;
  public foods: Array<String>;
  public mappedFoods: Array<Object>;
  public moves: Array<String>;
  public mappedMoves: Array<Object>;
  public eventChoices: Array<String>;
  public foodChoices: Array<String>;
  public transportationChoices: Array<String>;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public http: Http,
    public config: Config,
  ) {
    this.http = http;
    this.config = config;
    this.eventChoices = [];
    this.foodChoices = [];
    this.transportationChoices = [];
    this.events =
      [
        'amusement_park',
        'aquarium',
        'art_gallery',
        'bar',
        'book_store',
        'bowling_alley',
        'cafe',
        'campground',
        'casino',
        'cemetery',
        'church',
        'embassy',
        'food',
        'hindu_temple',
        'library',
        'mosque',
        'movie_theater',
        'museum',
        'night_club',
        'park',
        'restaurant',
        'shopping_mall',
        'spa',
        'stadium',
        'store',
        'synagogue',
        'university',
        'zoo'];

    this.moves = ['bike',
      'walk',
      'car',
      'bus'];

    this.foods = ['Mexican',
      'Creole',
      'Cajun',
      'French',
      'Barbecue',
      'Pizza',
      'Ice Cream',
      'Steak',
      'Burger',
      'Chicken',
      'Tacos',
      'Sushi',
      'Pasta',
      'Hot Dogs'
    ];
    this.mappedEvents = this.events.map(item => {
      const eventObj = {
        event: item,
        selected: false
      };
      return eventObj;
    });
    this.mappedFoods = this.foods.map(item => {
      const eventObj = {
        food: item,
        selected: false
      };
      return eventObj;
    });
    this.mappedMoves = this.moves.map(item => {
      const eventObj = {
        transportation: item,
        selected: false
      };
      return eventObj;
    });
  }

  generateTrips(events: string, foods: string, move: string, money: number, location: void) {
    // const location = await navigator.geolocation.getCurrentPosition((pos) => {
    //   console.log('pos', pos);
    //   const loc = `${pos.coords.latitude},${pos.coords.longitude}`;
    //   return loc;
    // }, (err) => {
    //   console.log('err', err);
    // }, {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // });
    console.log('events', events);
    console.log('foods', foods);
    console.log('move', move);
    return this.http.post(
      `${this.config.serverUrl}/getevents?events=${events}&food=${foods}&transportation=${move}&money=${money}&location=${location}`,
      this.headers)
      .map(trips => {
        console.log('trips', trips);
      }).toPromise().then(prefs => JSON.stringify(prefs));
  }
}
