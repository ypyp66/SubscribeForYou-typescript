import Home from "./routes/Home";
import { Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth";
import Test from "./components/Test";

function App() {
  return (
    <div className='container mx-auto p-10 h-screen'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth' component={Auth} />
        <Route path='/test' component={Test} />
      </Switch>
    </div>
  );
}

export default App;
