import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import LoginForm from "./Components/LoginForm";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" component={LoginForm} />
    </Routes>
  </BrowserRouter>
);

export default App;
