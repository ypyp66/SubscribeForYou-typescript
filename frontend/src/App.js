import { Route, Switch, Redirect } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import Login from './components/Login';
import Register from './components/Register';
import { connect } from 'react-redux';
import Detail from './components/Detail';
import axios from 'axios';
import { useEffect } from 'react';
import { setToken, setUser } from './modules/auth';

function App({ user }) {
  const authenticated = user != null;

  useEffect(()=> {
    checkUserIsValid();
  },[])

  //토큰 보내서 유저아이디 가져오기
  const getUser = async(currentToken) => {
    try{
      const result = await axios.get('/auth/api/user', {
        headers : {'Authorization' : `Token ${currentToken}`}
      });
      console.log(result);

      return result.data.userid;
    } catch (e) {
      console.log(e);
    }
  }

  //유저 검증
  const checkUserIsValid = () => {
    const currentUser = sessionStorage.getItem('userid');
    const currentToken = sessionStorage.getItem('token');
    
    getUser(currentToken).then(userid => {
      if (currentUser === userid) {
        console.log('equal');
        return true;
      }
    });
  }

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
        <Route exact path="/detail" component={Detail} />
      </Switch>
    </div>
  );
}

export default connect(
  (state) => ({
    user : state.auth.user
  })
)(App);
