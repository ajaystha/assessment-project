import { useEffect, useState } from 'react';

import List from '../../components/List';
import MonthFilter from '../../components/Filters/MonthFilter';
import CategoryFilter from '../../components/Filters/CategoryFilter';
import Pagination from '../../components/Pagination';

import s from './Workouts.module.css';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fetchError, setFetchError] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [monthFilter, setMonthFilter] = useState(null);
  const [catFilter, setCatFilter] = useState([]);

  useEffect(() => {
    loadWorkouts();

    // eslint-disable-next-line
  }, [page, monthFilter, catFilter]);

  const workoutSelectHandler = (workoutId) => {
    alert(workoutId);
  };

  const generateFilters = () => {
    let filters = '';

    if (monthFilter) {
      filters = `${filters}&month=${monthFilter}`;
    }

    if (catFilter.length > 0) {
      filters = `${filters}&categories=${catFilter.toString()}`;
    }

    return filters;
  };

  // get workout list
  const loadWorkouts = async () => {
    setFetchError(false);

    let params = `_page=${page}&_limit=${itemsPerPage}`;
    const filters = generateFilters();

    if (filters) {
      params = `${params}${filters}`;
    }

    try {
      const response = await fetch(`/api/workouts?${params}`);

      // check it status is ok
      if (response.status !== 200) throw new Error();

      const data = await response.json();

      // set data in states
      setWorkouts(data.workouts);
      setTotalItems(data.totalCount);
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

      {fetchError && <div className={s.ErrorMessage}>There was a problem loading data</div>}

      {!fetchError && (
        <>
          <div className={s.FilterContainer}>
            <MonthFilter selected={monthFilter} onSelectMonth={(value) => setMonthFilter(value)} />

            <CategoryFilter
              selected={catFilter}
              onToggleCategory={(value) => setCatFilter(value)}
            />
          </div>

          {totalItems < 1 ? (
            <div className={s.ErrorMessage}>No workouts available</div>
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
        </>
      )}
    </div>
  );
}
