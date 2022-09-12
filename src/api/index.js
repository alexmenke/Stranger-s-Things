const baseURL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-PT'

export const getPosts = async (token) => {
  try {
    const response = await fetch(`${baseURL}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.log('Error getting all posts.')
  }
}


export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error registering user.')
  }
}

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })

    const result = await response.json();

    return result;

  } catch (ex) {
    console.log('Error logging in user.')
  }
}


export const getUserInfo = async (token) => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    const result = await response.json();
    return result;

  } catch (ex) {
    console.log('Error getting user information.')
  }
}

export const addNewPost = async (token, { title, description, price, location, willDeliver }) => {
  try {
    const response = await fetch(`${baseURL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          location: location,
          willDeliver: willDeliver
        }
      })
    })

    const result = response.json();
    return result

  } catch (ex) {
    console.log('Error making new post.')
  }
}

export const deletePost = async (token, _id) => {
  try {
    const response = await fetch(`${baseURL}/posts/${_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const result = response.json();
    return result

  } catch (ex) {
    console.log('Error deleting post.')
  }
}

export const updatePost = async ({ token, title, description, price, location, willDeliver, _id }) => {
  try {
    const response = await fetch(`${baseURL}/posts/${_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    })
    const result = response.json();
    return result

  } catch (ex) {
    console.log('Error updating post.')
  }
}

export const createMessage = async ({postID, token, message}) => {
  try {
    const response = await fetch(`${baseURL}/posts/${postID}/messages`, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({
      message
     })
    })
    const result = await response.json();
    return result

  } catch(ex) {
    console.log('error creating message')
  }
}
