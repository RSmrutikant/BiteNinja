import { Switch, Route, Redirect } from 'react-router-dom';
import './Auth.css';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const Auth = () => {
  return (
    <Switch>
      <Route path="/auth/login">
        <Login />
      </Route>
      <Route path="/auth/signup">
        <Signup />
      </Route>
      <Redirect from="/auth" to="/auth/login"></Redirect>
    </Switch>
  );
};

export default Auth;
