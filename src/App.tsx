import React from 'react';
import {Routes, Route} from "react-router-dom";

import { Navbar } from './components/navbar/navbar.component';
import { Home } from './routes/home/home.route';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />}></Route>
          <Route path="profile" element={<h1>Profile page</h1>}></Route>
          <Route path="settings" element={<h1>Settings page</h1>}></Route>
          <Route path="help" element={<h1>Help page</h1>}></Route>
          <Route path="feedback" element={<h1>Feedback page</h1>}></Route>
          <Route path="about" element={<h1>About page</h1>}></Route>
          <Route path=":username" element={<h1>Blog page</h1>}></Route>
          <Route path="post/:id" element={<h1>Post page</h1>}></Route>
          <Route path="post" element={<h1>Create post page</h1>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
