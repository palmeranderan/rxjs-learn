//import { Observable } from "rxjs/Observable";

// //STEP 1
////cold observabel
// import "rxjs/add/operator/share";

// //One of the methods to create an observable
// //It accepts a subscribe function which accepts an observe argument
// var observable = Observable.create((observer: any) => {
//     try {
//         observer.next("Hello!");
//         observer.next("How Are you?");
//         setInterval(() => {
//             console.log("**INTERVAL NEXT")
//             observer.next("I'm good");
//         }, 2000);
//         //observer.complete();
//         //observer.next("This will not send");
//     }
//     catch (err) {
//         observer.error(err);
//     }
// }).share();

// var observer = observable.subscribe(
//     (x: any) => {
//         console.log(x);
//         addItem(x);
//     },
//     (error: any) => {
//         console.log(error);
//         addItem(error);
//     },
//     () => {
//         console.log("Console => Completed");
//         addItem("Completed");
//     }
// );

// //observer.add(observer2);

// setTimeout(() => {
//     console.log("UNSUBSCRIBE");
//     //following makes work only observer2
//     //observer.remove(observer2);

//     observer.unsubscribe();
// }, 6000);

// setTimeout(() => {
//     var observer2 = observable.subscribe(
//         (x: any) => {
//             console.log(x);
//             addItem("SUBSCRIBER 2: " + x);
//         }
//     );
// }, 1000);

//Step 2
////warm observable
// import { fromEvent } from "rxjs/observable/fromEvent";

// var observable = fromEvent(document, "mousemove");

// setTimeout(() => {
//     var subscribtion = observable.subscribe(
//         (x: any) => addItem(x)
//     );
// }, 2000);

// import {Subject} from "rxjs/Subject";
// //an observer able to emit values

// var subject = new Subject();

// subject.subscribe(
//     data => addItem("Observer 1" + data),
//     err => addItem(err),
//     () => addItem("Oberver 1 completed")
// );

// subject.next("The first thing has been sent");

// var observer2 = subject.subscribe(
//     data => addItem("Observer 2 " + data),
//     err => addItem(err),
//     () => addItem("Oberver 2 completed")
// );


// subject.next("The Second thing has been sent");
// subject.next("A third thing has been sent");

// observer2.unsubscribe();

// subject.next("A FINAL thing has been sent");

// import {BehaviorSubject} from "rxjs/BehaviorSubject";
// import { ReplaySubject } from "rxjs";
// //an observer able to emit values


// var subject = new BehaviorSubject("FIRST");
// //In this case takes the last 2 elements
// //var subject = new ReplaySubject(2);


// subject.subscribe(
//     data => addItem("Observer 1" + data),
//     err => addItem(err),
//     () => addItem("Oberver 1 completed")
// );

// subject.next("The first thing has been sent");
// subject.next("Observer 2 is about to subscribe")

// var observer2 = subject.subscribe(
//     data => addItem("Observer 2 " + data),
//     err => addItem(err),
//     () => addItem("Oberver 2 completed")
// );


// subject.next("The Second thing has been sent");
// subject.next("A third thing has been sent");

// observer2.unsubscribe();

// subject.next("A FINAL thing has been sent");

//STEP 4
// import { AsyncSubject } from "rxjs/AsyncSubject";


// var subject = new AsyncSubject();
// //In this case takes the last 2 elements
// //var subject = new ReplaySubject(2);


// subject.subscribe(
//     data => addItem("Observer 1: " + data)
// );

// var i = 0;
// var int = setInterval(() => subject.next(i++), 100);

// setTimeout(() => {
//     var observer2 = subject.subscribe(
//         data => addItem("Observer 2: " + data)
//     );
//     subject.complete();
// }, 500);


//STEP 5
// import { Observable } from "rxjs/Observable";
// import { merge } from "rxjs/observable/merge";

// var observable = Observable.create((observer: any) => {
//     observer.next("Hi!");
// });

// var observable2 = Observable.create((observer: any) => {
//     observer.next("How is it going?");
// });

// var newObs = merge(observable, observable2);

// newObs.subscribe((x: any) => addItem(x));

//step 6
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";

// Observable.create((observer: any) => {
//     observer.next("Hello world!");
// })
//     .map((val: any) => val.toUpperCase())
//     .subscribe((x: any) => addItem(x));

//STEP 7
// import { from } from "rxjs/observable/from";
// import "rxjs/add/operator/pluck";

// from([
//     {
//         first: "Gary",
//         last: "Simon",
//         age: 34
//     },
//     {
//         first: "Jane",
//         last: "Simon",
//         age: 34
//     },
//     {
//         first: "John",
//         last: "Simon",
//         age: 34
//     }
// ])
//     .pluck('first')
//     .subscribe((x: any) => addItem(x));

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { interval } from "rxjs/Observable/interval";
import "rxjs/add/operator/skipUntil";

var observable1 = Observable.create((data: any) => {
    var i = 1;
    setInterval(() => {
        data.next(i++);
    }, 1000);
});

var observable2 = new Subject();

setTimeout(() => {
    observable2.next("Hey!");
}, 5000);

var newObs = observable1.skipUntil(observable2);
newObs.subscribe((x: any) => addItem(x));

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}