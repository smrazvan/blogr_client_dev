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
          <Route path="profile" element={<h1>Profiel</h1>}></Route>
          <Route path="post/:id"></Route>
          <Route path="post"></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
