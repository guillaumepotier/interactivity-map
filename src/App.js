import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";

import router from "./router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
