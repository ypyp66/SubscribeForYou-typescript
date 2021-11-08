import { Route, Switch, Redirect } from "react-router-dom";
import { HomeRoute, Login, Register } from "routes";
import { useSelector } from "react-redux";
import Detail from "routes/Detail";
import Dropout from "routes/Dropout";
import { useEffect, useState } from "react";
import ResetPassword from "routes/ResetPassword";
import SESSION from "constants/StorageKeys";
import * as api from "utils/Api";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log("user changed");
    checkUserIsValid();
  }, [user]);

  //토큰 보내서 유저아이디 가져오기

  //유저 검증
  const checkUserIsValid = () => {
    const currentUser = sessionStorage.getItem(SESSION.USER);
    const currentToken = sessionStorage.getItem(SESSION.TOKEN);

    if (!currentToken || !currentUser) {
      setAuthenticated(false);
      return;
    }

    api.checkUserIsValid().then((userid) => {
      if (currentUser === userid) {
        //가져온 userid랑 같으면
        setAuthenticated(true);
      }
    });
  };

  return (
    <div className="container mx-auto h-full font-sans bg-blue-50 px-7 overflow-y-auto md:relative">
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
        <Route exact path="/detail">
          {authenticated ? <Detail /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/dropout">
          {authenticated ? <Dropout /> : <Redirect to="/login" />}
        </Route>
        <Route path="/resetpwd" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default App;
