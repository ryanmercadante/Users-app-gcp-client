import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])

  const fetchUsers = () => {
    fetch('https://api-dot-mernongae.appspot.com/api/users')
      .then(res => res.json())
      .then(users => setUsers(users))
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchUsers}>Get Users</button>
        <h3>Users</h3>
        <ul>
          {
            users.map(user => (
              <li>Name: {user?.name}, Age: {user?.age}</li>
            ))
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
