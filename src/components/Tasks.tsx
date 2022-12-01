import React, { useEffect } from 'react';
import { useTasks } from '../hooks';
import Checkbox from './Checkbox';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import AddTask from './AddTask';

type Props = {};

const Tasks = (props: Props) => {
  // get context values and values from hooks
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  // initialize project name
  let projectName = '';

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
    console.log('projectName 1: ', projectName);
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    console.log('projectName 2: ', projectName);
  }

  useEffect(() => {
    document.title = `${projectName}: FizzyTodo`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project_name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map((task: any) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};

export default Tasks;
