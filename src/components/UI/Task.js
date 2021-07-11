import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import DehazeIcon from '@material-ui/icons/Dehaze';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ORDER } from '../../constants/status';
import TasksService from '../../services/tasks.service';

const CONTENT_MAX_LENGTH = 40;

function Task(props) {
  const { order, id, index, content } = props;
  const tasksService = new TasksService();
  const [isContentShrink, setIsContentShrink] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const isAtTop = index === 0;

  const shrinkContent = (ctx) => {
    if (typeof ctx !== 'string') return '';

    if (ctx.length <= CONTENT_MAX_LENGTH) return ctx;
    return `${ctx.substring(0, CONTENT_MAX_LENGTH - 1)}...`;
  };

  const handleEditTaskDialogClose = () => {
    setOpenEditTaskDialog(false);
    setTaskTitle('');
  };

  const handleDeleteTaskDialogClose = () => {
    setOpenDeleteTaskDialog(false);
  };

  const editTask = async () => {
    try {
      await tasksService.updateTaskTitle(id, taskTitle);
      handleEditTaskDialogClose(false);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async () => {
    try {
      await tasksService.deleteTask(id);
      setOpenDeleteTaskDialog(false);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const markDone = async () => {
    try {
      await tasksService.updateTaskStatus(id, ORDER.THIRD);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={classnames('column__task__item', snapshot.isDragging && 'dragging', isAtTop && 'pinned')}
          >
            <div onClick={() => setIsContentShrink(!isContentShrink)}>
              {isContentShrink ? content : shrinkContent(content)}
            </div>
            <div className="d-flex" style={{ alignItems: 'center' }}>
              {isExpand ? (
                <>
                  <div
                    onClick={() => {
                      setOpenEditTaskDialog(true);
                      setTaskTitle(content);
                    }}
                  >
                    <EditIcon fontSize="small" id="edit-icon" />
                  </div>
                  {parseInt(order) === ORDER.SECOND && (
                    <div onClick={markDone}>
                      <DoneIcon fontSize="small" id="done-icon" />
                    </div>
                  )}
                  <div onClick={() => setOpenDeleteTaskDialog(true)}>
                    <HighlightOffIcon fontSize="small" id="delete-icon" />
                  </div>
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

      <Dialog open={openEditTaskDialog} onClose={handleEditTaskDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter new title</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Task Title"
            type="text"
            fullWidth
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditTaskDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTask} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteTaskDialog} onClose={handleDeleteTaskDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTaskDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTask} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Task.propTypes = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default Task;
