import { Component, OnInit } from '@angular/core';
import { TripService } from '../../shared/services/trip.service';
import { ProfileService } from '../../shared/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public events: Array<Object>;
  public foods: Array<Object>;
  public moves: Array<Object>;
  public eventArr: Array<String> = [];
  public foodArr: Array<String> = [];
  public moveArr: Array<String> = [];
  public counter: number = 0;
  public check: string;
  public message: string;
  constructor(
    public tripService: TripService,
    public profileService: ProfileService,
    public router: Router,
  ) {
    this.router = router;
    this.profileService = profileService;
    this.events = this.tripService.mappedEvents;
    this.foods = this.tripService.mappedFoods;
    this.moves = this.tripService.mappedMoves;
  }

  ngOnInit() {
  }

  async next() {
    console.log('this.counter', this.counter);
    if (this.counter === 2) {
      this.check = await this.profileService.addPreferences(this.eventArr, this.foodArr, this.moveArr);
      this.router.navigate(['dashboard']);
    } else {
      this.counter += 1;
    }
  }
  toggleColor(name) {
    console.log('current choice', name);
    name.selected ? name.selected = false : name.selected = true;
    console.log('color changed');
  }
  addEvent(event) {
    this.eventArr.push(event.event);
  }

  addFood(food) {
    this.foodArr.push(food.food);
  }

  addTransportation(move) {
    this.moveArr.push(move.transportation);
    this.next();
    this.counter++;
  }
}
