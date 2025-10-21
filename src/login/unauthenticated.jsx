import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <div>
        <form method="get" action="mypantry.html">
        <div className="input-group mb-3">
            <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button type="submit" className="btn btn-primary" onClick={() => loginUser()} disabled={!userName || !password}>
              Login
              </button>
            <button type="submit" className="btn btn-outline-secondary" onClick={() => createUser()} disabled={!userName || !password}>
              Create
              </button>
          </div>
        </form>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
