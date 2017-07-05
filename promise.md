# Promise
It's a little bit hard to understand at the begining

### Understanding Promises
"Imaging you are a kid. Your mom promises you that shell'll get you a new phone next week".

You dont' know if you will get that phone until next week.

That is a **promise**. A promise has 3 states. They are:

* Promise is **pending**: You don't know if you will get that phone until next week.
* Promise is **resolved**: Your mom really buy you a brand new phone.
* Promise is **rejected**: You don't get a new phone because your mom is not happy.

### Creating Promises
Let's convert this to JavaScript

```javascript
let isMomHappy = false;

const willGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: 'Samsung',
      color: 'black'
    };
    resolve(phone);
  } else {
    const reason = new Error('mom is not happy');
    reject(reason);
  }
});
```



### Consuming Promises
Now that we have the promise, let's consume it.

```javascript
let isMomHappy = false;

const willGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: 'Samsung',
      color: 'black'
    };
    resolve(phone);
  } else {
    const reason = new Error('mom is not happy');
    reject(reason);
  }
});

// call our promise

const askMom = () => {
  willGetNewPhone.then(fulfilled => {
    console.log("fulfilled", fulfilled);
  }).catch(error => {
    console.log("error:", error);
  });
};

askMom();
```

### Chaining Promises
Promises are chainable.

Let's say. you, the kid, **promise** your friend that you will **show them** the new phone 
when your mom buy you one.

That is another promise. Let's write it.

```javascript
let isMomHappy = false;

const willGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: 'Samsung',
      color: 'black'
    };
    resolve(phone);
  } else {
    const reason = new Error('mom is not happy');
    reject(reason);
  }
});

// 2dn promise
/*const showOff = (phone) => {
  return new Promise((resolve, reject) => {
    const message = 'Hey friend, I have a new ' + phone.color + ' ' + phone.brand + ' phone';
    resolve(message);
  });
};*/

// It this example, your might realize we didn't call the `reject`. It's optional.
// We can shorten this example like using `Promise.resolve` instead

// shorten it 2dn promise

const showOff = (phone) => {
  const message = 'Hey friend, I have a new ' + phone.color + ' ' + phone.brand + ' phone';
  return Promise.resolve(message);
};

// call our promise

const askMom = () => {
  willGetNewPhone.then(showOff)
    .then(fulfilled => {
      console.log(fulfilled);
    })
    .catch(error => {
    console.log("error:", error);
  });
};

askMom();
```

### Promises are Asynchronous
Promise are asynchronous.

You, the kid, wouldn't stop playing while waiting for your mom promise (the new phone).
Don't you? That's something we call **asynchronous**, the code will run without blocking or 
waiting for the result. Anything that need to wait for promise to proceed, you put that in `then`

### Promises in ES5, ES6/ES7
**ES5 - Majority browsers**

You can include `Bluebird` promise library. It's because ES5 doesn't support promises out of the box.

**ES6/ES2015 - Modern browsers, NodeJs v6**

ES6 supports promises natively.

**ES7 - Async Await make the syntax look prettier**
ES7 introduce `async` and `await` syntax. It makes the asynchronous syntax look prettier and easier to understand,
without `then` and `catch`

```javascript
const isMomHappy = true;

// Promsie
const willGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: 'Samsung',
      color: 'black'
    };
    resolve(phone);
  } else {
    const reason = new Error('mom is not happy');
    reject(reason);
  }
});

// 2nd promise
async function showOff(phone) {
  return new Promise((resolve, reject) => {
    const message = 'Hey friend, I have a new ' + phone.color + ' ' + phone.brand + ' phone';
    resolve(message);
  });
}

async function askMom() {
  try {
    console.log('before asking Mom');
    let phone = await willGetNewPhone;
    let message = await showOff(phone);
    console.log(message);
    console.log('after asking mom');
  } catch (e) {
    console.log(error.message);
  }
}

(async()=> {
  await askMom();
})();
```

* Whenever you need to return a promise in a function, you prepend `async` to that function. 
E.g. `async function showOff(phone)`.

* Whenever you need a call a promise, you prepend with await

* Use `try{} and catch(error) {}` to catch promise error. the **reject** promise

### Why Promises and When to Use Them

##### What if You Want to Perform Subsequent Async Action
Let's say instead of just add the numbers one time, we want to add 3 times. In a normal function, we do this:

```javascript
// add two numbers normally

let resultA, resultB, resultC;

 function add (num1, num2) {
    return num1 + num2;
}

resultA = add(1, 2); // you get resultA = 3 immediately
resultB = add(resultA, 3); // you get resultB = 6 immediately
resultC = add(resultB, 4); // you get resultC = 10 immediately

console.log('total' + resultC);
console.log(resultA, resultB, resultC);
```

How it looks like with callbacks?

```javascript
// add two numbers remotely
// get the result by calling an API

let resultA, resultB, resultC;

function addAsync (num1, num2, callback) {
    // use the famous jQuery getJSON callback API
    return $.getJSON('http://www.example.com', {
        num1: num1,
        num2: num2
    }, callback);
}

addAsync(1, 2, success => {
    // callback 1
    resultA = success; // you get result = 3 here

    addAsync(resultA, 3, success => {
        // callback 2
        resultB = success; // you get result = 6 here

        addAsync(resultB, 4, success => {
            // callback 3
            resultC = success; // you get result = 10 here

            console.log('total' + resultC);
            console.log(resultA, resultB, resultC);
        });
    });
});
```

The syntax is less user friendly. In a nicer term. It looks like a pyramid, but people 
usually refer this as `callback hell`, because the callback nested into another callback. 
Imagine you have 10 callbacks, your code will nested 10 times.

##### Escape From Callback Hell

Let's look at the promise version of the same example.

```javascript
Promises come in to rescue. Let's look at the promise version of the same example.

// add two numbers remotely using observable

let resultA, resultB, resultC;

function addAsync(num1, num2) {
    // use ES6 fetch API, which return a promise
    return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
        .then(x => x.json());
}

addAsync(1, 2)
    .then(success => {
        resultA = success;
        return resultA;
    })
    .then(success => addAsync(success, 3))
    .then(success => {
        resultB = success;
        return resultB;
    })
    .then(success => addAsync(success, 4))
    .then(success => {
        resultC = success;
        return resultC;
    })
    .then(success => {
        console.log('total: ' + success)
        console.log(resultA, resultB, resultC)
    });
```

With promises, we flatten the callback with `.then`. In a way, it looks cleanr 
because of no callback nesting. Of course, with ES7 `async` syntax, we can even further
enhance this example

### New Kid On the Block: Observables
Before your settle down with promises, there is something that has come about to make it even easier to deal 
with async data called `Observables`.

| Observables are lazy event streams which can emit zero or more events, and may or may not finish

Some key differences between promises and observable are:

* Observables are cancellable
* Observables are lazy

Let look at the same demo written with Observables. In this example using Rxjs

```javascript
let Observable = Rx.Observable;
let resultA, resultB, resultC;

function addAsync(num1, num2) {
    // use ES6 fetch API, which return a promise
    const promise = fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
        .then(x => x.json());

    return Observable.fromPromise(promise);
}

addAsync(1,2)
  .do(x => resultA = x)
  .flatMap(x => addAsync(x, 3))
  .do(x => resultB = x)
  .flatMap(x => addAsync(x, 4))
  .do(x => resultC = x)
  .subscribe(x => {
    console.log('total: ' + x)
    console.log(resultA, resultB, resultC)
  });
```

Notes:

* `Observable.fromPromise` converts a promise to observable stream.
* `.do` and `.flatMap` are among some of the operators available for Observables
* Streams are lazy. Our `addAync` runs when we `.subscribe` to it.

Observables can do more funky stuff easily. For example, `delay` add function by `3 second` with just 
one line of code retry so you can retry a call a certain number of times

```javascript
addAsync(1,2)
  .delay(3000) // delay 3 seconds
  .do(x => resultA = x)
```