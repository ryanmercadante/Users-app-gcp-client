import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()

  const fetchUsers = async () => {
    const res = await fetch('https://api-dot-mernongae.appspot.com/api/v1/users')
    const data = await res.json()
    setUsers(data.data)
  }

  const addUser = async (e) => {
    e.preventDefault()
    const res = await fetch('https://api-dot-mernongae.appspot.com/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName, lastName
      })
    })
    const data = await res.json()
    console.log('data', data)
    if (data.success) {
      await fetchUsers()
    }
    setFirstName('')
    setLastName('')
  }

  const deleteUser = async (id) => {
    const res = await fetch(`https://api-dot-mernongae.appspot.com/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    const data = await res.json()
    console.log('data', data)
    if (data.success) {
      await fetchUsers()
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h3>Add users to the list</h3>
        <form onSubmit={addUser}>
          <input
            type='text'
            value={firstName}
            placeholder='first name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            value={lastName}
            placeholder='last name'
            onChange={(e) => setLastName(e.target.value)}
          />
          <button className='add-user-btn'>Add</button>
        </form>
        <h3>Users</h3>
        <ul>
          {
            users.map(user => (
              <div key={user._id} className='user'>
                <li>{user.firstName} {user.lastName}</li>
                <button onClick={() => deleteUser(user._id)}>X</button>
              </div>
            ))
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
