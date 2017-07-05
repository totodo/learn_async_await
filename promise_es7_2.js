let resultA, resultB, resultC;
async function a() {
  return Promise.resolve(1);
}

async function b() {
  return Promise.resolve(2);
}

async function c() {
  return Promise.resolve(3);
}

async function compute() {
  const [aa, bb, cc] = await Promise.all([a(), b(), c()]);
  console.log("aa, bb, cc", aa, bb, cc);
}
compute().then(result => console.log(result));