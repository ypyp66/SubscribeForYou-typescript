import { Route, Switch, Router, useHistory, Redirect } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import Login from './components/Login';
import Register from './components/Register';
import { connect } from 'react-redux';
import HomeContainer from './containers/HomeContainer';

function App({ user }) {
  const history = useHistory();
  const authenticated = user != null;
  console.log(user);

  return (
    <div className="container mx-auto p-10 h-screen">
      <Switch>
        <Route exact path="/">
          {authenticated ? <HomeContainer /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!authenticated ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {!authenticated ? <Register /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
