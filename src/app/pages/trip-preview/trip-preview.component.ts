import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from '../../../config';

@Component({
  selector: 'app-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss']
})
export class TripPreviewComponent implements OnInit {
  public stops: Array<object>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public config: Config,
  ) {
    this.config = config;
  }

  ngOnInit() {
    const dollarSigns = ['$', '$$', '$$$', '$$$$'];
    this.route.queryParams.map((data) => {
      console.log('data', data);
      this.stops = data.trip.map(stop => {
        console.log('stop');
        console.log(stop);
        console.log('stop');
        stop = JSON.parse(JSON.parse(stop));
        let holder;
        if (stop.price > 0) {
          holder = stop.price;
          stop.price = dollarSigns[holder];
        }
        if (stop.price < 0) { stop.price = 'Unknown'; }
        // holder = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${stop.photo}&key=${this.config.key}`;
        stop.photo = holder;

        return stop;
      });
      return data;
    }).toPromise().then(res => res);
  }

}
