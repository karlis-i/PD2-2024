
import React from "react";
import ReactDOM from "react-dom/client";


function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Let's start coding!</p>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
