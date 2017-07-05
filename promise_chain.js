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