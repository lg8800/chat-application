import { Switch, Route } from 'react-router-dom';
import "./App.css";
import Layout from './components/Layout/Layout';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/Chat-Page'
function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
         <Route path='/chatpage'>
          <ChatPage />
        </Route>
        
      </Switch>
    </Layout>
  );
}

export default App;