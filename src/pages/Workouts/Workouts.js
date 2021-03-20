import { useEffect, useState } from 'react';

import List from '../../components/List';

import s from './Workouts.module.css';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    loadWorkouts();

    // eslint-disable-next-line
  }, []);

  const workoutSelectHandler = (workout_id) => {
    alert(workout_id);
  };

  const loadWorkouts = async () => {
    try {
      const response = await fetch(`/workouts?_page=${page}&_limit=${itemsPerPage}`);
      const data = await response.json();
      const totalCount = response.headers.get('X-Total-Count');

      setWorkouts(data);
      setTotalItems(totalCount || null);
      setError(false);
      return { data, totalItems };
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={s.WorkoutsContainer}>
      <List title="Workouts" data={workouts} onItemClick={workoutSelectHandler} />
    </div>
  );
}
