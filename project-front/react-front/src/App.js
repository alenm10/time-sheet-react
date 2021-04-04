import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import interceptors from "./services/Interceptors";
import ChangePassword from './components/ChangePassword'
import Settings from './components/Settings'
import ForgotPassword from './components/ForgotPassword'
import ConfirmReset from './components/ConfirmReset'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/home" component={Header}></Route>
            <Route path="/change-password" component={ChangePassword}></Route>
            <Route path="/settings" component={Settings}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
            <Route path="/confirm-reset" component={ConfirmReset}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
