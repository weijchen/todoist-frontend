import React from 'react';
import TasksService from '../../services/tasks.service';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getTasks = async () => {
    setIsWaiting(true);
    setErrorMsg('');

    try {
      const tasksService = new TasksService();
      const result = await tasksService.fetchTasks();
    } catch (err) {}
  };
}

export default Home;
