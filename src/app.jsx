import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
            <a className="navbar-brand" href="index.html">The College Kitchen Survival Guide</a>
          <menu className="navbar-nav">
            <li className = "nav-item"><a className = "nav-link" href="index.html">Home</a></li>
            <li className = "nav-item"><a className = "nav-link" href="mypantry.html">My Pantry</a></li>
            <li className = "nav-item"><a className = "nav-link" href="mymealfeed.html">My Meal Feed</a></li> 
          </menu>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className="bg-dark text-white-50">
        <div className="container-fluid">
          <span className="text-reset">Amelia Sommercorn</span>
          <a className="text-reset" href="https://github.com/ansommer/startup">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
