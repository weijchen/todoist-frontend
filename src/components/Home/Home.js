import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer } from 'mobx-react';

import { Header } from '../UI/Header';
import Footer from '../UI/Footer';
import Column from '../UI/Column';
import { initialData } from '../../constants/fakeTodoData';

export const Home = observer(() => {
  const [dataColumnOrder, setDataColumnOrder] = useState(null);
  const [dataColumns, setDataColumns] = useState(null);

  const isDataReady = dataColumns !== null;

  // Ref: https://codesandbox.io/s/reverent-antonelli-6296o?file=/src/App.tsx
  // Ref: https://codesandbox.io/s/react-beautiful-dnd-experiment-4k722?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
  const reorder = (source, destination, startCol, endCol) => {
    if (source === null || destination === null) return;
    if (startCol === endCol) {
      const newTasks = startCol.tasks.filter((_, id) => id !== source.index);
      newTasks.splice(destination.index, 0, startCol.tasks[source.index]);

      const newCol = {
        id: startCol.id,
        groupName: startCol.groupName,
        tasks: newTasks,
      };

      setDataColumns((state) => ({
        ...state,
        [newCol.id]: newCol,
      }));
    } else {
      const newStarTasks = startCol.tasks.filter((_, id) => id !== source.index);
      const newStartCol = {
        id: startCol.id,
        groupName: startCol.groupName,
        tasks: newStarTasks,
      };

      const newEndTasks = endCol.tasks;
      newEndTasks.splice(destination.index, 0, startCol.tasks[source.index]);
      const newEndCol = {
        id: endCol.id,
        groupName: endCol.groupName,
        tasks: newEndTasks,
      };

      setDataColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const startCol = dataColumns[source.droppableId];
    const endCol = destination ? dataColumns[destination.droppableId] : { ...startCol };
    reorder(source, destination, startCol, endCol);
  };

  useEffect(() => {
    const { columnOrder, columns } = initialData;
    setDataColumnOrder(columnOrder);
    setDataColumns(columns);
  }, []);

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
                    droppableId={colData.id}
                    title={colData.groupName}
                    tasks={colData.tasks}
                    type={ind === 2 ? 'done' : 'active'}
                  />
                );
              })}
          </div>
        </div>
      </DragDropContext>
      <Footer />
    </>
  );
});

// export default observer(Home);
