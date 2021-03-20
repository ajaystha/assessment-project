import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Workouts from '../pages/Workouts';
import WorkoutDetails from '../pages/WorkoutDetails';

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
              <Workouts />
            </Route>

            <Route path="/workouts/:workoutId" exact>
              <WorkoutDetails />
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
