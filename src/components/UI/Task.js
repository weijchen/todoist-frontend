import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const classNames = require('classnames');

const CONTENT_MAX_LENGTH = 40;

function Task(props) {
  const { id, index, content } = props;
  const [isContentShrink, setIsContentShrink] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const isAtTop = index === 0;

  const shrinkContent = (ctx) => {
    if (typeof ctx !== 'string') return '';

    if (ctx.length <= CONTENT_MAX_LENGTH) return ctx;
    return `${ctx.substring(0, CONTENT_MAX_LENGTH - 1)}...`;
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={classNames('column__task__item', snapshot.isDragging && 'dragging', isAtTop && 'pinned')}
          >
            <div onClick={() => setIsContentShrink(!isContentShrink)}>
              {isContentShrink ? content : shrinkContent(content)}
            </div>
            <div className="d-flex">
              {isExpand ? (
                <>
                  <EditIcon fontSize="small" id="edit-icon" />
                  <DoneIcon fontSize="small" id="done-icon" />
                  <HighlightOffIcon fontSize="small" id="delete-icon" />
                  <KeyboardArrowLeftIcon fontSize="small" id="expand-less-icon" onClick={() => setIsExpand(false)} />
                </>
              ) : (
                <ExpandMoreIcon fontSize="small" id="expand-more-icon" onClick={() => setIsExpand(true)} />
              )}
              <div {...provided.dragHandleProps}>
                <DehazeIcon fontSize="small" id="drag-icon" />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default Task;
