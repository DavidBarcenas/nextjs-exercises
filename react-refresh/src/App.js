import { Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import AllMeetupsPage from './pages/AllMeetups';
import FavoritesPage from './pages/Favorites';
import NewMeetupsPage from './pages/NewMeetups';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup">
          <NewMeetupsPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
