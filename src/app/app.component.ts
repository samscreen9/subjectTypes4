import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  interval,
  ReplaySubject,
  Subject,
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  ngOnInit() {
    /* Simple subject */
    let s = new Subject();

    let o1 = s.subscribe((data) => {
      console.log(data + ' ' + 'for one');
    });
    s.next(1);
    let o2 = s.subscribe((data) => {
      console.log(data + ' ' + 'for two');
    });
    s.next(2);

    /*here  you can see that when o1 subscribes s there is no data it waits till there is 1, till this point o2 has not subscribed so o1 will get 1 and 1 will be removed out later o1,o2 is still Listening then 2 is emmited which is taken by both  */

    /* Behaviour subject */
    let s1 = new BehaviorSubject(0);
    let o11 = s1.subscribe((data) => {
      console.log('behaviour for one ' + data);
    });
    s1.next(1);
    let o12 = s1.subscribe((data) => {
      console.log('behaviou for two ' + data);
    });
    s1.next(2);
    /*here 0,1 is stored till next value emmited from observable and can have initial value */
    /***************************************************************/

    /*ReplaySubject */
    /*In behavior subject only last emitted value is provided to new subscriber but with replaysubject initial values are also provided, for that it has two parameters buffersize and windowtime. so replaySubject(1) and behaviorSubject() does the same function */

    let s2 = new ReplaySubject(); //new ReplaySubject(2)
    s2.next(1);
    s2.next(2);
    s2.subscribe((data) => {
      console.log(data + ' ' + 'replay1');
    });
    s2.next(3);
    s2.subscribe((data) => {
      console.log(data + ' ' + 'replay2');
    });
    /************************************************************/
    /*Async subject*/
    /*subject will produce last emitted value before its complete , like waits for complete to deliver a  single value*/

    let asyncsub = new AsyncSubject();
    let o21 = asyncsub.subscribe((data) => {
      console.log(data);
    });
    asyncsub.next(1);
    asyncsub.next(2);
    asyncsub.next(10);
    asyncsub.complete();

    /*if you remove asyncsub.complete the the last 10 value will not be emitted*/
    /***********************************************************/
    /*voidSubject subject does not emmit anything if you don't want to pass any value but just want to hook into the event and invoke the observer irrespective of value emmited*/
    let voidsub = new Subject<void>();
  }
}
