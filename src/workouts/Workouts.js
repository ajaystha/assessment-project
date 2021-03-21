import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import WorkoutList from './WorkoutList';
import WorkoutDetails from './WorkoutDetails';

import s from './Workouts.module.css';

export default function Workouts() {
  let { path } = useRouteMatch();

  const [page, setPage] = useState(1);
  const [monthFilter, setMonthFilter] = useState(null);
  const [catFilter, setCatFilter] = useState([]);

  return (
    <div className={s.WorkoutsContainer}>
      <Router>
        <Switch>
          <Route path={path} exact>
            <WorkoutList
              page={page}
              monthFilter={monthFilter}
              catFilter={catFilter}
              onSetPage={(page) => setPage(page)}
              onUpdateMonthFilter={(value) => setMonthFilter(value)}
              onUpdateCatFilter={(value) => setCatFilter(value)}
            />
          </Route>

          <Route path={`${path}/:workoutId`} exact>
            <WorkoutDetails />
          </Route>

          <Route path="*">
            <Redirect to={path} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
