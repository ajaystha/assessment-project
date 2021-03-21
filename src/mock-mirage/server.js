import { createServer, Response } from 'miragejs';
import { workouts } from './db';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.timing = 800;
      this.namespace = '/api';

      // all workouts
      this.get('/workouts', (schema, request) => {
        const { page, limit, month, categories } = request.queryParams;

        const filtered = filterData(month, categories);
        const paginated = paginateData([...filtered], page, limit);

        return { workouts: paginated, totalCount: filtered.length };
      });

      // workouts by ID
      this.get('/workouts/:id', (schema, request) => {
        const { id } = request.params;

        const data = workouts.find((workout) => workout.id === parseInt(id));

        if (data) {
          return data;
        } else {
          return new Response(404, { errors: ['User not found'] });
        }
      });
    },
  });

  return server;
}

// generate filtered data from request url params
const filterData = (month, categories) => {
  let filtered = [];

  if (month && categories) {
    const catArr = categories.split(',');

    filtered = workouts.filter((w) => {
      const dataMonth = w.startDate.split('/')[1];
      return dataMonth === month && catArr.includes(w.category);
    });
  } else if (month) {
    filtered = workouts.filter((w) => {
      const dataMonth = w.startDate.split('/')[1];
      return dataMonth === month;
    });
  } else if (categories) {
    filtered = workouts.filter((w) => {
      const catArr = categories.split(',');
      return catArr.includes(w.category);
    });
  } else {
    filtered = [...workouts];
  }

  return filtered;
};

const paginateData = (data, page, limit) => {
  const startIdx = (page - 1) * limit;

  return data.splice(startIdx, limit);
};
