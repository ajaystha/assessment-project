import { useEffect, useState } from 'react';

import List from '../../components/List';
import Pagination from '../../components/Pagination';

import s from './Workouts.module.css';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fetchError, setFetchError] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    loadWorkouts();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadWorkouts();

    // eslint-disable-next-line
  }, [page]);

  const workoutSelectHandler = (workout_id) => {
    alert(workout_id);
  };

  // get workout list
  const loadWorkouts = async () => {
    setFetchError(false);

    try {
      const response = await fetch(`/workouts?_page=${page}&_limit=${itemsPerPage}`);

      // check it status is ok
      if (response.status !== 200) throw new Error();

      const data = await response.json();
      const totalCount = response.headers.get('X-Total-Count');

      // set data in states
      setWorkouts(data);
      setTotalItems(totalCount || null);
      return { data, totalItems };
    } catch (error) {
      setFetchError(true);
    }
  };

  const calculateTotalPages = () => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  return (
    <div className={s.WorkoutsContainer}>
      <div className={s.WorkoutListTitle}>Workouts</div>

      {fetchError ? (
        <div className={s.ErrorMessage}>There was a problem loading data</div>
      ) : (
        <>
          <List title="Workouts" data={workouts} onItemClick={workoutSelectHandler} />

          <div className={s.PaginationContainer}>
            <div className={s.TotalText}>Total Workouts: {totalItems}</div>

            {totalItems > itemsPerPage && (
              <Pagination
                className={s.Pagination}
                totalPages={calculateTotalPages()}
                currentPage={page}
                pagesToShow={10}
                onSetPage={(page) => setPage(page)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
