import React, { useState, useEffect } from 'react';
import './App.css';

const localhost = 'http://localhost:4000/api/v1/users'
const api = 'https://api-dot-mernongae.appspot.com/api/v1/users'

function App() {
  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()

  const fetchUsers = async () => {
    const res = await fetch(localhost)
    const data = await res.json()
    setUsers(data.data)
  }

  const addUser = async (e) => {
    e.preventDefault()
    const res = await fetch(localhost, {
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
    await fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
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
          <button>Add User</button>
        </form>
        <h3>Users</h3>
        <ul>
          {
            users.map(user => (
              <li key={user._id}>{user.firstName} {user.lastName}</li>
            ))
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
