const listEement = document.querySelector('ul');
const postTemplate = document.getElementById('single-post-template');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // once one header is added, you can't delete!
    // xhr.setRequestHeader('Content-Type', 'application-json');
    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response);
      } else {
        reject(new Error('Something went wrong!'));
      }
    };

    xhr.onerror = function () {
      // not all erros are caught by this
      reject(new Error('Failed to send request!'));
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

async function fetchPosts() {
  try {
    const listOfPosts = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/podsts'
    );
    listEement.textContent = '';
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listEement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }

  // sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
  //   (response) => {
  //     // const listOfPosts = JSON.parse(this.response);
  //     const listOfPosts = response;

  //     for (const post of listOfPosts) {
  //       const postEl = document.importNode(postTemplate.content, true);
  //       postEl.querySelector('h2').textContent = post.title.toUpperCase();
  //       postEl.querySelector('p').textContent = post.body;
  //       listEement.append(postEl);
  //     }
  //   }
  // );
}

async function createPost(title, content) {
  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', {
    title: title,
    body: content,
    userId: Math.random(),
  });
}

const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content');

  createPost(enteredTitle, enteredContent);
});

postList = document.querySelector('ul');

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
