function getProcessedData(url) {
  return downloadData(url)    // returns a promise
    .catch(e => {
      return downloadFallbackData(url);   // return a promise
    })
    .then(v => {
      return processDataInWorker(v);  // returns a promise
    })
}


// it can be rewritten with a single async function as follows:

async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}