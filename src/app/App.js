import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Workouts from '../workouts';

import './App.css';

// for mock-server with miragejs
import { makeServer } from '../mock-mirage/server';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

function App() {
  return (
    <div className="App">
      <Header />

      <main className="AppMainContent">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/workouts" />
            </Route>

            <Route path="/workouts">
              <Workouts />
            </Route>

            <Route path="*">
              <Redirect to="/workouts" />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
