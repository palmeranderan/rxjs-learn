import { Observable } from "rxjs/Observable";

//One of the methods to create an observable
//It accepts a subscribe function which accepts an observe argument
var observable = Observable.create((observer: any) => {
    try {
        observer.next("Hello!");
        observer.next("How Are you?");
        setInterval(() => {
            console.log("**INTERVAL NEXT")
            observer.next("I'm good");
        }, 2000);
        //observer.complete();
        //observer.next("This will not send");
    }
    catch (err) {
        observer.error(err);
    }
});

var observer = observable.subscribe(
    (x: any) => {
        console.log(x);
        addItem(x);
    },
    (error: any) => {
        console.log(error);
        addItem(error);
    },
    () => {
        console.log("Console => Completed");
        addItem("Completed");
    }
);

var observer2 = observable.subscribe(
    (x: any) => {
        console.log(x);
        addItem(x);
    }
);

observer.add(observer2);

setTimeout(() => {
    console.log("UNSUBSCRIBE");
    //following makes work only observer2
    //observer.remove(observer2);

    observer.unsubscribe();
}, 6000);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}