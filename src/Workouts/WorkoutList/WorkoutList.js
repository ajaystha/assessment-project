import { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import MonthFilter from '../../components/Filters/MonthFilter';
import CategoryFilter from '../../components/Filters/CategoryFilter';
import Pagination from '../../components/Pagination';

import s from './WorkoutList.module.css';

export default function Workouts(props) {
  const { page, monthFilter, catFilter, onSetPage, onUpdateMonthFilter, onUpdateCatFilter } = props;

  const { path } = useRouteMatch();
  const { push } = useHistory();

  const [workouts, setWorkouts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fetchError, setFetchError] = useState(false);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    loadWorkouts();

    // eslint-disable-next-line
  }, [page, monthFilter, catFilter]);

  // generate filters
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

  // calculate total number of pages
  const calculateTotalPages = () => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  return (
    <div className={s.WorkoutListContainer}>
      <div className={s.WorkoutListTitle}>Workouts</div>

      {fetchError && <div className={s.Message}>There was a problem loading data</div>}

      {!fetchError && (
        <>
          <div className={s.FilterContainer}>
            <MonthFilter selected={monthFilter} onSelectMonth={onUpdateMonthFilter} />

            <CategoryFilter selected={catFilter} onToggleCategory={onUpdateCatFilter} />
          </div>

          {totalItems < 1 ? (
            <div className={s.Message}>No workouts available</div>
          ) : (
            <>
              <div className={s.ListContainer}>
                {workouts.map((item) => (
                  <div
                    key={item.id}
                    className={s.ListItem}
                    onClick={() => push(`${path}/${item.id}`)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>

              <div className={s.PaginationContainer}>
                <div className={s.TotalText}>Total Workouts: {totalItems}</div>

                {totalItems > itemsPerPage && (
                  <Pagination
                    className={s.Pagination}
                    totalPages={calculateTotalPages()}
                    currentPage={page}
                    pagesToShow={10}
                    onSetPage={onSetPage}
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
