import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStores from '../../stores/stores';
import TasksService from '../../services/tasks.service';

function Header() {
  const tasksService = new TasksService();
  const { windowStore } = useStores();
  const [isHeaderAtTop, setIsHeaderAtTop] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const onClickAddBtn = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const addTask = async () => {
    try {
      await tasksService.createTask(taskTitle, '');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 60) {
        setIsHeaderAtTop(false);
      } else {
        setIsHeaderAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderAtTop]);

  return (
    <>
      <div className="container">
        <Navbar expand="lg" fixed="top" className={classnames('__header', isHeaderAtTop ? '' : 'active')}>
          <div className="__todo__navbar__logo container-fluid">
            <Link to="/">
              <p>{windowStore.width === 'sm' ? 'A' : 'Achieve!'}</p>
            </Link>
            <div className="__todo__navbar__functions d-flex">
              <div onClick={() => onClickAddBtn()}>
                <AddIcon className="functions__add" />
              </div>
            </div>
          </div>
        </Navbar>
      </div>

      <Dialog open={openAddDialog} onClose={handleAddDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>To create New Task, please enter title of your task.</DialogContentText>
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
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default observer(Header);
