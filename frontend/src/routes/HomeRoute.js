import { Route, Redirect } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';

function HomeRoute({ path, authenticated }) {
  return (
    <div>
      <HomeContainer />
    </div>
  );
}

export default HomeRoute;
