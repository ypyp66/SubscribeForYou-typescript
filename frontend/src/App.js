import { Route, Switch, Redirect } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import Login from './components/Login';
import Register from './components/Register';
import { connect } from 'react-redux';
import Detail from './components/Detail';
import Dropout from './components/Dropout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setToken, setUser } from './modules/auth';
import SubscribeDetail from './components/SubscribeDeail';

function App({ user, pk }) {
  const [authenticated, setAuthenticated] = useState(false);
  //const authenticated = user != null;

  useEffect(() => {
    checkUserIsValid();
  }, [user]);

  //토큰 보내서 유저아이디 가져오기
  const getUser = async (currentToken) => {
    try {
      const result = await axios.get('/auth/api/user', {
        headers: { Authorization: `Token ${currentToken}` },
      });

      return result.data.user_id;
    } catch (e) {
      sessionStorage.removeItem('userid');
      sessionStorage.removeItem('token');
    }
  };

  //유저 검증
  const checkUserIsValid = () => {
    const currentUser = sessionStorage.getItem('userid');
    const currentToken = sessionStorage.getItem('token');

    if (!currentToken || !currentUser) {
      setAuthenticated(false);
      return;
    }

    getUser(currentToken).then((userid) => {
      if (currentUser === userid) {
        //가져온 userid랑 같으면
        setAuthenticated(true);
      }
    });
  };

  return (
    <div className="container mx-auto p-10 h-screen font-sans">
      <Switch>
        <Route exact path="/">
          {authenticated ? <HomeRoute /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!authenticated ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {!authenticated ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/sub/detail/:pk" component={SubscribeDetail} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/dropout" component={Dropout} />
      </Switch>
    </div>
  );
}

export default connect(
  (state) => ({
    user: state.auth.user,
    token: state.auth.token,
    pk: state.auth.pk,
  }),
  {
    setToken,
    setUser,
  },
)(App);
