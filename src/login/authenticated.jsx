import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
        <div className="d-flex justify-content-center gap-2">
          <Button variant='primary' onClick={() => navigate('/mypantry')}>
            My Pantry
          </Button>
          <Button variant='primary' onClick={() => navigate('/mymealfeed')}>
            My Meal Feed
          </Button>
          <Button variant='secondary' onClick={() => logout()}>
            Logout
          </Button>
        </div>
    </div>
  );
}
