import { Route, Switch, Redirect } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import Login from './components/Login';
import Register from './components/Register';
import { connect } from 'react-redux';

function App({ user }) {
  const authenticated = user != null;

  return (
    <div className="container mx-auto p-10 h-screen font-sans">
      <Switch>
        <Route exact path="/">
          {authenticated ? <HomeRoute user={user}/> : <Redirect to="/login" />}
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

export default connect(
  (state) => ({
    user : state.auth.user
  })
)(App);
