import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

import Layout from '../../components/Home/Home';
import TasksService from '../../services/tasks.service';
import StatusesService from '../../services/statuses.service';
import { sortedColumn } from '../../constants/status';

function Home() {
  const tasksService = new TasksService();
  const statusesService = new StatusesService();
  const [tasks, setTasks] = useState(null);
  const [statuses, setStatuses] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true);

  const getTasks = async () => {
    setIsWaiting(true);
    setErrorMsg('');

    try {
      const params = { status: '', search: '' };
      const result = await tasksService.fetchTasks(params);
      const { data } = result;
      const tmpData = {};
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const ele = data[key];
          const id = data[key].id;
          tmpData[`${id}`] = {
            id: ele.id,
            title: ele.title,
            description: ele.description,
            status: ele.status,
            createTime: ele.createTime,
            updateTime: ele.updateTime,
          };
        }
      }
      setTasks(tmpData);
    } catch (err) {
      console.log('[containers/Home/Home getTasks()] Error', err);
      setErrorMsg(err);
    }
  };

  const getStatuses = async (params) => {
    setIsWaiting(true);
    setErrorMsg('');

    try {
      const result = await statusesService.fetchStatuses(params);
      const { data } = result;
      const tmpData = cloneDeep(sortedColumn);
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const ele = data[key];
          const order = ele.order;
          tmpData[`${order}`] = {
            id: order,
            groupName: ele.title,
            tasks: ele.tasks,
            tasks_display: [],
          };
        }
      }
      setStatuses(tmpData);
      setIsWaiting(false);
    } catch (err) {
      console.log('[containers/Home/Home getTasks()] Error', err);
      setErrorMsg(err);
      setIsWaiting(false);
    }
  };

  const updateTaskStatus = (id, body) => {
    setIsWaiting(true);
    setErrorMsg('');
    try {
      tasksService.updateTaskStatus(id, body);
      setIsWaiting(false);
    } catch (err) {
      console.log('[containers/Home/Home updateTaskStatus()] Error', err);
      setErrorMsg(err);
      setIsWaiting(false);
    }
  };

  const updateStatusTitle = (order, body) => {
    setIsWaiting(true);
    setErrorMsg('');
    try {
      statusesService.updateStatusTitle(order, body);
      setIsWaiting(false);
    } catch (err) {
      console.log('[containers/Home/Home updateStatusTitle()] Error', err);
      setErrorMsg(err);
      setIsWaiting(false);
    }
  };

  const updateStatusTasks = async (order, body) => {
    setIsWaiting(true);
    setErrorMsg('');
    try {
      await statusesService.updateStatusTasks(order, body);
      getStatuses();
      setIsWaiting(false);
    } catch (err) {
      console.log('[containers/Home/Home updateStatusTasks()] Error', err);
      setErrorMsg(err);
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    setIsTokenValid(!!token);
  }, [window.localStorage]);

  useEffect(() => {
    getStatuses();
    getTasks();
  }, []);

  return (
    <Layout
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      isTokenValid={isTokenValid}
      tasks={tasks}
      updateTaskStatus={updateTaskStatus}
      statuses={statuses}
      getStatuses={getStatuses}
      updateStatusTitle={updateStatusTitle}
      updateStatusTasks={updateStatusTasks}
    />
  );
}

export default Home;
