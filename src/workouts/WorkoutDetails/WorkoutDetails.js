import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import Chevron from '../../components/Icons/Chevron';

import s from './WorkoutDetails.module.css';

export default function WorkoutDetails() {
  const { workoutId } = useParams();
  const { push } = useHistory();

  const [workout, setWorkout] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    if (isNaN(workoutId)) {
      push('/workouts');
      return;
    }

    loadWorkoutById();

    // eslint-disable-next-line
  }, []);

  // Get workout details by ID
  const loadWorkoutById = async () => {
    setFetching(true);
    setFetchError(false);

    try {
      const response = await fetch(`/api/workouts/${workoutId}`);

      // check it status is ok
      if (response.status !== 200) throw new Error();

      const data = await response.json();

      // set data in states
      setWorkout(data);
    } catch (error) {
      setFetchError(true);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className={s.WorkoutDetailsContainer}>
      <Link className={s.BackButton} to="/workouts">
        <div className={s.ButtonWrapper}>
          <Chevron className={s.ButtonIcon} /> Back
        </div>
      </Link>

      {fetchError && <div className={s.Message}>There was a problem loading data</div>}

      {isFetching && <Spinner />}

      {!isFetching && workout && (
        <>
          <h1 className={s.Title}>{workout.name}</h1>

          <div>
            <span>Start Date:</span> {workout.startDate}
          </div>
          <div>
            <span>Category:</span> {workout.category}
          </div>

          <p>{workout.description}</p>
        </>
      )}
    </div>
  );
}
