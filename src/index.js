
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/store/auth-context";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import recoilPersist from "recoil-persist";
import { ToastContainer, toast } from 'react-toastify';
import {SpeechProvider} from '@speechly/react-client';
  import 'react-toastify/dist/ReactToastify.css';
import env from "react-dotenv";

const { RecoilPersist, updateState } = recoilPersist([], {
  key: "recoil-persist",
  storage: sessionStorage,
});

ReactDOM.render(
  <SpeechProvider appId={env.app_id} language={env.lang}>
  <AuthContextProvider>
    <BrowserRouter>
      <RecoilRoot initializeState={updateState}>
        <RecoilPersist />
        <App />
        <ToastContainer pauseOnFocusLoss={false}/>
      </RecoilRoot>
    </BrowserRouter>
  </AuthContextProvider>
  </SpeechProvider>,
  document.getElementById('root')
);
