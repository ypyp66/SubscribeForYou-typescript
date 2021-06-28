import Home from "./routes/Home";
import { Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth";
import Test from "./components/Test";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className='container mx-auto p-10 h-screen'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth' component={Auth} />
        <Route path='/login' component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path='/test' component={Test} />
       
      </Switch>
    </div>
  );
}

export default App;
