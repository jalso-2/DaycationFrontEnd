import { Injectable } from '@angular/core';

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
  constructor(
  ) {
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

}
