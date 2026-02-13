import React from 'react';

const App = () => {
  const schedule = [
    { day: 'Monday', tasks: ['Task 1', 'Task 2'] },
    { day: 'Tuesday', tasks: ['Task 3'] },
    { day: 'Wednesday', tasks: ['Task 4', 'Task 5'] },
    { day: 'Thursday', tasks: [] },
    { day: 'Friday', tasks: ['Task 6', 'Task 7'] },
    { day: 'Saturday', tasks: ['Task 8'] },
    { day: 'Sunday', tasks: [] },
  ];

  return (
    <div>
      <h1>Weekly Schedule</h1>
      <ul>
        {schedule.map(({ day, tasks }) => (
          <li key={day}>
            <h2>{day}</h2>
            <ul>
              {tasks.length ? tasks.map(task => <li key={task}>{task}</li>) : <li>No tasks</li>}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;