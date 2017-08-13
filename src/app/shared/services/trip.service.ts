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
  public choicesRes: Array<string> = [];
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
    if (this.choicesRes.length) { this.choicesRes = []; }

    events = events.split(',').map((event) => {
      return event.trim();
    }).join(',');
    foods = foods.split(',').map((food) => {
      return food.trim();
    }).join(',');

    return this.http.post(
      `${this.config.serverUrl}/getevents?events=${events}&food=${foods}&transportation=${move}&money=${money}&location=${location}`,
      this.headers)
      .map(trips => {
        const destinationChoices = JSON.parse(trips['_body']);
        console.log('JSON.parse(trips[\'_body\'])', JSON.parse(trips['_body']));
        console.log('JSON.parse(trips[\'_body\'])', JSON.parse(trips['_body']).length);
        console.log('destinationChoices', destinationChoices);
        console.log('destinationChoices', destinationChoices.length);
        for (let i = 0; i < 5; i++) {
          let index;
          let dest;
          const tempArr = [];
          const x = destinationChoices[0].length / 2;
          const y = destinationChoices[0].length - 1;
          const temp = destinationChoices.slice();

          for (let j = 0; j < 6; j++) {
            index = j === 2 || j === 5 ? Math.floor(Math.random() * (Math.floor(Math.random() * ((y - x) + 1) + x))) :
              Math.floor(Math.random() * (Math.floor(x)));

            if (j < 5) {
              dest = {
                name: temp[0][index],
                address: temp[1][index],
                price: temp[3][index],
                photo: temp[2][index]
              };
              tempArr.push(JSON.stringify(dest));
            }
            if (j === 5 && money > 100) {
              console.log('getting inside j === 5 && money > 100 condition');
              dest = {
                name: temp[0][index],
                address: temp[1][index],
                price: temp[3][index],
                photo: temp[2][index]
              };
              tempArr.push(JSON.stringify(dest));
            }
            temp[0].splice(index, 1);
            temp[1].splice(index, 1);
            temp[2].splice(index, 1);
            temp[3].splice(index, 1);
          }
          this.choicesRes.push(JSON.stringify([this.tripNameGenerator(), tempArr]));
        }
        console.log('this.choices res', this.choicesRes);
        return this.choicesRes;
      }).toPromise().then(trips => trips );
  }

  tripNameGenerator() {
    const word1 = [
      'Adorable',
      'Adventurous',
      'Agreeable',
      'Alert',
      'Awful',
      'Bad',
      'Beautiful',
      'Better',
      'Bewildered',
      'Blushing',
      'Bored',
      'Brainy',
      'Brave',
      'Breakable',
      'Bright',
      'Busy',
      'Calm',
      'Careful',
      'Cautious',
      'Charming',
      'Cheerful',
      'Clean',
      'Clear',
      'Clever',
      'Cooperative',
      'Courageous',
      'Crazy',
      'Creepy',
      'Crowded',
      'Cruel',
      'Curious',
      'Cute',
      'Cangerous',
      'Dark',
      'Dead',
      'Defeated',
      'Defiant',
      'Difficult',
      'Disgusted',
      'Distinct',
      'Disturbed',
      'Dizzy',
      'Doubtful',
      'Drab',
      'Dull',
      'Eager',
      'Easy',
      'Elated',
      'Elegant',
      'Embarrassed',
      'Envious',
      'Evil',
      'Excited',
      'Expensive',
      'Exuberant',
      'Fair',
      'Faithful',
      'Famous',
      'Fancy',
      'Fantastic',
      'Fierce',
      'Filthy',
      'Fine',
      'Foolish',
      'Fragile',
      'Frail',
      'Frantic',
      'Friendly',
      'Frightened',
      'Funny',
      'Gentle',
      'Gifted',
      'Glamorous',
      'Gleaming',
      'Grieving',
      'Grotesque',
      'Grumpy',
      'Handsome',
      'Happy',
      'Healthy',
      'Helpful',
      'Helpless',
      'Hilarious',
      'Ill',
      'Important',
      'Impossible',
      'Inexpensive',
      'Innocent',
      'Inquisitive',
      'Itchy',
      'Jealous',
      'Jittery',
      'Jolly',
      'Joyous',
      'Kind',
      'Long',
      'Lovely',
      'Lucky',
      'Magnificent',
      'Misty',
      'Modern',
      'Motionless',
      'Muddy',
      'Mushy',
      'Mysterious',
      'Nasty',
      'Naughty',
      'Nervous',
      'Nice',
      'Nutty',
      'Obedient',
      'Obnoxious',
      'Odd',
      'Old - fashioned',
      'Open',
      'Outrageous',
      'Outstanding',
      'Panicky',
      'Perfect',
      'Plain',
      'Pleasant',
      'Poised',
      'Poor',
      'Proud',
      'Puzzled',
      'Quaint',
      'Real',
      'Relieved',
      'Repulsive',
      'Rich',
      'Scary',
      'Selfish',
      'Shiny',
      'Shy',
      'Silly',
      'Sleepy',
      'Smiling',
      'Talented',
      'Tame',
      'Tender',
      'Tense',
      'Terrible',
      'Tired',
      'Tough',
      'Unsightly',
      'Upset',
      'Uptight',
      'Vast',
      'Victorious',
      'Vivacious',
      'Wandering',
      'Weary',
      'Wicked',
      'Wide - Eyed',
      'Wild',
      'Witty',
      'Zany',
      'Zealous'
    ];

  const word2 = [
      'Alive',
      'Amused',
      'Area',
      'Ashamed',
      'Attractive',
      'Average',
      'Book',
      'Business',
      'Case',
      'Child',
      'Cloudy',
      'Clumsy',
      'Colorful',
      'Comfortable',
      'Concerned',
      'Confused',
      'Company',
      'Country',
      'Day',
      'Delightful',
      'Depressed',
      'Determined',
      'Different',
      'Unusual',
      'Enchanting',
      'Encouraging',
      'Energetic',
      'Enthusiastic',
      'Eye',
      'Fact',
      'Family',
      'Glorious',
      'Good',
      'Gorgeous',
      'Government',
      'Graceful',
      'Group',
      'Hand',
      'Home',
      'Homeless',
      'Homely',
      'Horrible',
      'Hungry',
      'Hurt',
      'Job',
      'Lazy',
      'Life',
      'Light',
      'Lively',
      'Lonely',
      'Lot',
      'Man',
      'Money',
      'Month',
      'Mother',
      'Mr',
      'Night',
      'Number',
      'Part',
      'People',
      'Place',
      'Point',
      'Powerful',
      'Precious',
      'Prickly',
      'Problem',
      'Program',
      'Question',
      'Right',
      'Room',
      'School',
      'State',
      'Splendid',
      'Spotless',
      'Stormy',
      'Strange',
      'Story',
      'Smoggy',
      'Sore',
      'Sparkling',
      'Successful',
      'Super',
      'Student',
      'Study',
      'System',
      'Thing',
      'Time',
      'Testy',
      'Thankful',
      'Thoughtful',
      'Water',
      'Way',
      'Week',
      'Woman',
      'Word',
      'Work',
      'World',
      'Year',
    ];

  return `${word1[Math.floor(Math.random() * word1.length)]} ${word2[Math.floor(Math.random() * word2.length)]} Trip`;
  }
}
