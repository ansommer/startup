import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './app.css';
import { AuthState } from './login/authState';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyMealFeed } from './mymealfeed/mymealfeed';
import { MyPantry } from './mypantry/mypantry';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="body text-light">
        <header className="container-fluid">

          <nav className="navbar navbar-dark navbar-expand-md fixed-top">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">The College Kitchen Survival Guide</NavLink>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="mainNav">
                <ul className="navbar-nav">
                  <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                  {authState === AuthState.Authenticated && (
                  <li className="nav-item"><NavLink className="nav-link" to="/mypantry">My Pantry</NavLink></li>
                  )}
                  <li className="nav-item"><NavLink className="nav-link" to="/mymealfeed">My Meal Feed</NavLink></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/mypantry' element={<MyPantry userName={userName}/>} />
          <Route path='/mymealfeed' element={<MyMealFeed userName={userName} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="text-white-50">
        <div className="container-fluid d-flex gap-3">
          <span className="text-reset">Amelia Sommercorn</span>
          <a className="text-reset" href="https://github.com/ansommer/startup" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="text-reset">|</span>
          <a className="text-reset" href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer">
            Recipes powered by Spoonacular
          </a>
        </div>
      </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}