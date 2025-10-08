import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Welcome to The College Kitchen Survival Guide!</h1>
      <form method="get" action="mypantry.html">
        <div className="input-group mb-3">
            <input className="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <input className="form-control" type="password" placeholder="password" />
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-outline-secondary">Create</button>
          </div>
        </form>
    </main>
  );
}