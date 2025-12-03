import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    console.log(`Logging user ${userName}`);
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    console.log(`Creating user ${userName}`);
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    console.log(`Logging in or creating user ${userName}`);
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    loginUser();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <div className="input-group mb-3">
            <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button type="submit" className="btn btn-primary" disabled={!userName || !password}>
              Login
              </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => createUser()} disabled={!userName || !password}>
              Create
              </button>
          </div>
        </div>
      </form>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}

//onClick={() => loginUser()}
