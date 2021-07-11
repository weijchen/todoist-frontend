import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../UI/Header';
import Footer from '../UI/Footer';
import Column from '../UI/Column';
import { STATUSES_ORDER } from '../../constants/status';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
function Home(props) {
  const { isWaiting, errorMsg, tasks, updateTaskStatus, statuses, updateStatusTasks } = props;
  const classes = useStyles();

  const [dataColumnOrder, setDataColumnOrder] = useState(null);
  const [dataColumns, setDataColumns] = useState(null);

  const isDataReady = dataColumns !== null;

  // Ref: https://codesandbox.io/s/reverent-antonelli-6296o?file=/src/App.tsx
  // Ref: https://codesandbox.io/s/react-beautiful-dnd-experiment-4k722?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
  const reorder = (source, destination) => {
    if (source === null || destination === null) return;

    const srcCol = source.droppableId;
    const desCol = destination.droppableId;
    const srcInd = source.index;
    const desInd = destination.index;

    if (srcCol === desCol) {
      const newTasks = statuses[srcCol].tasks.filter((_, ind) => ind !== srcInd);
      const toMove = statuses[srcCol].tasks[srcInd];
      newTasks.splice(desInd, 0, toMove);
      updateStatusTasks(desCol, newTasks);
    } else {
      const newTasks = statuses[srcCol].tasks.filter((_, ind) => ind !== srcInd);
      const toMove = statuses[srcCol].tasks[srcInd];
      updateStatusTasks(srcCol, newTasks);

      const newEndTasks = statuses[desCol].tasks;
      newEndTasks.splice(desInd, 0, toMove);
      updateStatusTasks(desCol, newEndTasks);
      updateTaskStatus(toMove, Number(desCol));
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    reorder(source, destination);
  };

  const mapStatusTasks = (statuses, tasks) => {
    for (const key in statuses) {
      if (Object.hasOwnProperty.call(statuses, key)) {
        const status = statuses[key];
        status.tasks.forEach((task) => {
          status.tasks_display.push(tasks[task]);
        });
      }
    }
  };

  useEffect(() => {
    if (!statuses || !tasks) return;

    mapStatusTasks(statuses, tasks);
    setDataColumnOrder(STATUSES_ORDER);
    setDataColumns(statuses);
  }, [statuses, tasks]);

  useEffect(() => {
    if (errorMsg) alert(errorMsg);
  }, [errorMsg]);

  return (
    <>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="todo__home">
          <div className="todo__container d-flex">
            {isDataReady &&
              Array.isArray(dataColumnOrder) &&
              dataColumnOrder.map((ele, ind) => {
                const colData = dataColumns[ele];
                return (
                  <Column
                    key={colData.id}
                    droppableId={`${colData.id}`}
                    title={colData.groupName}
                    tasks={colData.tasks_display}
                    type={ind === 2 ? 'done' : 'active'}
                  />
                );
              })}
          </div>
        </div>
      </DragDropContext>
      <Footer />
      <Backdrop className={classes.backdrop} open={isWaiting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

Home.propTypes = {
  isWaiting: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isTokenValid: PropTypes.bool.isRequired,
  tasks: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      createTime: PropTypes.string,
      updateTime: PropTypes.string,
    }),
  ),
  updateTaskStatus: PropTypes.func.isRequired,
  statuses: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string,
      groupName: PropTypes.string,
      tasks: PropTypes.arrayOf,
      tasks_display: PropTypes.arrayOf,
    }),
  ),
  getStatuses: PropTypes.func.isRequired,
  updateStatusTitle: PropTypes.func.isRequired,
  updateStatusTasks: PropTypes.func.isRequired,
};

export default Home;
