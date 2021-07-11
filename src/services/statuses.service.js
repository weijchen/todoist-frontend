// import queryString from 'query-string';
import BaseHttpService from './base-http.service';

export default class StatusesService extends BaseHttpService {
  fetchStatuses(params) {
    if (params) {
      const { order } = params;
      return this.get(`statuses/${order}`);
    }
    return this.get('statuses/');
  }

  updateStatusTitle(order, title) {
    return this.patch(`statuses/${order}/title`, { title });
  }

  updateStatusTasks(order, tasks) {
    return this.patch(`statuses/${order}/tasks`, { tasks });
  }
}
