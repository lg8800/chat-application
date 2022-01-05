import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/store/auth-context";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import recoilPersist from "recoil-persist";

const { RecoilPersist, updateState } = recoilPersist([], {
  key: "recoil-persist",
  storage: sessionStorage,
});

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <RecoilRoot initializeState={updateState}>
        <RecoilPersist />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
