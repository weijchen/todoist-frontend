/* eslint-disable import/prefer-default-export */
export const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      groupName: 'Backlog',
      tasks: [
        {
          id: 'asdf',
          content:
            'Take out the garbage Take out the garbage Take out the garbage Take out the garbage Take out the garbage',
        },
        {
          id: '2',
          content: 'Watch movie',
        },
        {
          id: '3',
          content: 'charge phone',
        },
        {
          id: '4',
          content: 'Cook dinner!',
        },
      ],
    },
    'column-2': {
      id: 'column-2',
      groupName: 'In Progress',
      tasks: [
        {
          id: '5',
          content: 'Watch NBA',
        },
        {
          id: '6',
          content: 'Take Shower',
        },
      ],
    },
    'column-3': {
      id: 'column-3',
      groupName: 'Done',
      tasks: [
        {
          id: '7',
          content: 'Watch NBA',
        },
      ],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
