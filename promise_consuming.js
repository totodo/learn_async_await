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