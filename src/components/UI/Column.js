import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Task from './Task';

function Column(props) {
  const { droppableId, title, tasks, type } = props;
  const isDropDisabled = type === 'done';
  console.log(tasks);
  return (
    <>
      <div className="column__container">
        <h3 className="column__task__title">{title}</h3>
        <Droppable droppableId={droppableId} type={type} isDropDisabled={isDropDisabled}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classnames('column__task__list', snapshot.isDraggingOver && 'draggingOver')}
            >
              {tasks.map((ele, ind) => (
                <Task id={ele.id} key={ele.id} index={ind} content={ele.content} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

Column.propTypes = {
  droppableId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf.isRequired,
  type: PropTypes.string.isRequired,
};

export default Column;
