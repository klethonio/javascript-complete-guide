const button = document.querySelector('button');

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });

  return promise;
};

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });

  return promise;
};

async function trackUserHandler() {
  let response, timeData;
  try {
    response = await getPosition();
    timeData = await setTimer(1000);
  } catch (error) {
    console.log(error);
  }
  console.log(timeData, response);
}

// (async function () {
//   res = await setTimer(2000);
//   console.log('async #1: ', res);
// })();
// setTimer(1000).then(res => {
//   console.log('async #2: ', res);
// });

button.addEventListener('click', trackUserHandler);

// the response will be the data of the fastest promisse
// Promise.race([getPosition(), setTimer(1000)]).then(response => {
//   console.log(response);
// });

// the response will be the combination of all the promisses
// if one of then fail, you will get only the one error
// Promise.all([getPosition(), setTimer(1000)]).then(response => {
//   console.log(response);
// }).catch(error => {
//   console.log(error);
// });

// we will get all the results, either error or success, right to then
Promise.allSettled([getPosition(), setTimer(1000)]).then(response => {
  console.log('success: ', response);
});
