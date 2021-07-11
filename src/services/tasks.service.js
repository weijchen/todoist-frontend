import queryString from 'query-string';
import BaseHttpService from './base-http.service';

export default class TasksService extends BaseHttpService {
  fetchTasks({ status, search }) {
    const queryObj = {};

    if (status.length) {
      queryObj.status = status;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get(`tasks/${queryStr ? `?${queryStr}` : ''}`);
  }

  async deleteTask(id) {
    await this.delete(`tasks/${id}`);
  }

  async updateTaskTitle(id, title) {
    return this.patch(`tasks/${id}/title`, {
      title,
    });
  }

  updateTaskStatus(id, status) {
    return this.patch(`tasks/${id}/status`, {
      status,
    });
  }

  createTask(title, description) {
    return this.post('tasks', {
      title,
      description,
    });
  }
}
