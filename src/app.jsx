import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyMealFeed } from './mymealfeed/mymealfeed';
import { MyPantry } from './mypantry/mypantry';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
              <NavLink className="navbar-brand" to="/">The College Kitchen Survival Guide</NavLink>
            <menu className="navbar-nav">
              <li className = "nav-item"><NavLink className = "nav-link" to="/">Home</NavLink></li>
              <li className = "nav-item"><NavLink className = "nav-link" to="/mypantry">My Pantry</NavLink></li>
              <li className = "nav-item"><NavLink className = "nav-link" to="/mymealfeed">My Meal Feed</NavLink></li> 
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/mypantry' element={<MyPantry />} />
          <Route path='/mymealfeed' element={<MyMealFeed />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Amelia Sommercorn</span>
            <a className="text-reset" href="https://github.com/ansommer/startup">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}