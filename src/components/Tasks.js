import React, {useEffect} from 'react';
import { CheckBox } from './CheckBox';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { AddTask } from './AddTask';

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks } = useTasks(selectedProject);

    // define projectName variable
    let projectName = '';

    if(projects && selectedProject && !collatedTasksExist(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name;
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }

    useEffect(() => {
        document.title = `${projectName}: FizzyTodo`;
    });

    return (
        /*  ##Note : data-testid for component testing*/
        <div className="tasks" data-testid="tasks">
            
            <h2 data-testid="project-name">{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map(task => (
                    <li key={`${task.id}`}>
                        <CheckBox id={task.id} />
                        <span>{task.task}</span>
                    </li>   
                ))}
            </ul>

            <AddTask />
        </div>
    )
}