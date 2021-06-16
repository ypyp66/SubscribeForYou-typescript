import Home from "./routes/Home";
import { Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth";

function App() {
  return (
    <div className='container mx-auto p-10 h-screen'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth' component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
