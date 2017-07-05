let resultA, resultB, resultC;
async function addAsync(num1, num2) {
  return Promise.resolve(num1 + num2);
}

async function compute() {
  resultA = await addAsync(1, 2);
  resultB = await addAsync(resultA, 3);
  resultC = await addAsync(resultB, 4);
  console.log(resultA, resultB, resultC);
}
compute();