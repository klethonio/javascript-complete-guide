const listEement = document.querySelector('ul');
const postTemplate = document.getElementById('single-post-template');

function sendHttpRequest(method, url, data) {
  // there is no need for promisse porque it's already "promisifed"
  return fetch(url, {
    method: method,
    body: data,
    // body: JSON.stringify(data),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      return response.json().then((error) => {
        console.log(error);
        throw new Error('Something went wrong! (Serve Side)');
      });
    })
    .catch((error) => {
      console.log(error);
      // this goes to the outer function
      throw new Error('Something went wrong!');
    });
}

async function fetchPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    const listOfPosts = response.data;

    // const response = await sendHttpRequest(
    //   'GET',
    //   'https://jsonplaceholder.typicode.com/posts'
    // );
    // we also have response.text() and .blob() for files
    // const listOfPosts = await response.json();
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
    console.log(error.response);
  }
}

async function createPost(title, content) {
  const formData = new FormData(form);

  // formData.append('title', title);
  // formData.append('body', content);
  formData.append('userId', Math.random());

  // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      title: title,
      body: content,
      userId: Math.random(),
    }
  );
  console.log(response);

  // sendHttpRequest(
  //   'POST',
  //   'https://jsonplaceholder.typicode.com/posts',
  //   formData
  // );
  // sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', {
  //   title: title,
  //   body: content,
  //   userId: Math.random(),
  // });
}

const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#body').value;

  createPost(enteredTitle, enteredContent);
});

postList = document.querySelector('ul');

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;

    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    // sendHttpRequest(
    //   'DELETE',
    //   `https://jsonplaceholder.typicode.com/posts/${postId}`
    // );
  }
});
