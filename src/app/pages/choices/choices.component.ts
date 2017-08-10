import { Component, OnInit } from '@angular/core';
import { TripService } from '../../shared/services/trip.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent implements OnInit {
  public eventChoices: Array<String>;
  public mappedEventChoices: Array<Object>;
  public chosen: Array<String>;
  public place: number;
  public selected: String;
  constructor(
    public tripService: TripService,
    public router: Router,
  ) {
    this.router = router;
    this.eventChoices = tripService.events;
    this.mappedEventChoices = tripService.mappedEvents;
    this.chosen = [];
    this.place = 0;
  }

  toggleColor(name) {
    name.selected ? name.selected = false : name.selected = true;
  }
  addToChosen(name) {
    this.chosen.push(name);
    if (this.place === 0) {
      if (this.tripService.eventChoices.length <= 5) {
      this.tripService.eventChoices.push(name);
      } else {

      }
    }
    if (this.place === 1) {
    this.tripService.foodChoices.push(name);
    }
    if (this.place === 2) {
    this.tripService.transportationChoices.push(name);
    }
    console.log('You chose:', this.chosen);
  }
  nextStep() {
    this.chosen = [];
    if (this.place <= 1) {
      this.place++;
    } else if (this.place > 1) {
      this.router.navigate(['mytrips']);
    }
  }
  ngOnInit() {
  }

}
