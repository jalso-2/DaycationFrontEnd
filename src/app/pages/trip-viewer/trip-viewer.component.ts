import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-viewer',
  templateUrl: './trip-viewer.component.html',
  styleUrls: ['./trip-viewer.component.scss']
})
export class TripViewerComponent implements OnInit {
  public trips: Array<[string, string[]]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.map((data) => {
      this.trips = data.trips.map(trip => {
        return JSON.parse(trip);
      });
      return data;
    }).toPromise().then(res => res);
  }

  viewTrip(index) {
    const temp = this.trips[index][1];
    console.log('type of ', Array.isArray(temp));
    console.log('JSON.stringify', JSON.stringify(temp));
    console.log('length', temp.length);
    const destinations =  temp.map((dest) => {
      return JSON.stringify(dest);
    });
    this.router.navigate(['trip-preview'], { queryParams: { trip: destinations } });
  }
}
