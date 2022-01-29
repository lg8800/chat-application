
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
const lang=process.env.lang||'en-US'
const appid=process.env.app_id||'8b238cd8-597a-4c70-add6-222799409645'
ReactDOM.render(
  <SpeechProvider appId={env.appid} language={env.lang}>
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
