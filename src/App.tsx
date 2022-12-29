import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/navbar/navbar.component";
import { Create } from "./routes/create/create.route";
import { Home } from "./routes/home/home.route";
import { Profile } from "./routes/profile/profile.route";
import { View } from "./routes/view/view.route";
import Blog from "./routes/blog/Blog";
import ProtectedRoute from "./routes/protected-route/protected-route";
import Login from "./routes/login/login";
import Register from "./routes/register/register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />}></Route>
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="settings" element={<h1>Settings page</h1>}></Route>
          <Route path="help" element={<h1>Help page</h1>}></Route>
          <Route path="feedback" element={<h1>Feedback page</h1>}></Route>
          <Route path="about" element={<h1>About page</h1>}></Route>
          <Route path=":username" element={<Blog />}></Route>
          <Route path="post/:id" element={<View />}></Route>
          <Route
            path="post"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
