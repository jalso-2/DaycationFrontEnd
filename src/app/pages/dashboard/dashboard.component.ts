import { Component, OnInit } from '@angular/core';
import { TripService } from '../../shared/services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: String;
  public currentAmount: number = 0;
  public location: any;
  public locType: string;
  public trips: Array<string>;
  constructor(
    public tripService: TripService,
    public router: Router,
  ) {
    // this.tripService = tripService;
  }

  ngOnInit() {
    this.geoCoords();
    this.user = JSON.parse(localStorage.getItem('user'))[0].name;
  }

  geoCoords() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log('pos', pos);
      this.location = `${pos.coords.latitude},${pos.coords.longitude}`;
      console.log(this.location);
      this.locType = 'string';
      return this.location;
    }, (err) => {
      console.log('err', err);
      return err;
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
  }
  onInputChange(amount) {
    this.currentAmount = Math.floor(amount.value);
  }
  async generate() {
    const choices = JSON.parse(JSON.parse(localStorage.getItem('user'))[0].preferences.value);
    console.log(this.location);
    if (this.locType === 'string' ) {
      this.trips = await this.tripService.generateTrips(choices[0].events.join(','),
        choices[1].foods.join(','),
        choices[2].moves.join(','),
        this.currentAmount,
        this.location);

      this.router.navigate(['trip-viewer'], { queryParams: { trips: this.trips } });
    } else {
      this.geoCoords();
    }
  }
}
