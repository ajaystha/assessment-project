import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
