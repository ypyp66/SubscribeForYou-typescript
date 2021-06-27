import Home from './routes/Home';
import { Route, Switch, Router } from 'react-router-dom';
import Auth from './routes/Auth';
import Test from './components/Test';
import Login from './components/Login';
import Register from './components/Register';
import { connect } from 'react-redux';

function App({ user }) {
  const authenticated = user != null;
  console.log(user);

  return (
    <div className="container mx-auto p-10 h-screen">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default connect((state) => ({
  user: state.auth.user,
  token: state.auth.token,
}))(App);
