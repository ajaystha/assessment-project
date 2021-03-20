import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../components/Header';

import './App.css';

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

            <Route path="/workouts" exact>
              <div>Workout List page</div>
            </Route>

            <Route path="/workouts/:workoutId">
              <div>Workout details page</div>
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
