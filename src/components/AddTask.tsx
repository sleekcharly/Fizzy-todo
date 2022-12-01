import moment from 'moment';
import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';
import ProjectOverlay from './ProjectOverlay';
import TaskDate from './TaskDate';

type Props = {
  showAddTaskMain?: boolean;
  showShouldMain?: boolean;
  showQuickAddTask?: boolean;
  setShowQuickAddTask?: any;
};

const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}: Props) => {
  // define compnent state parameters
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState<boolean | ''>(showShouldMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  // get selected projet alue
  const { selectedProject } = useSelectedProjectValue();

  // add Task function
  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'asdfghjkl',
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
        })
    );
  };
  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={() => setShowMain(!showMain)}
          role="button"
          tabIndex={0}
          aria-label="Add Task"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-test-id="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-tastid="add-task-quick-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Close quick add task dialog"
                >
                  x
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
            onKeyDown={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
            role="button"
            tabIndex={0}
            aria-label="Add task"
          >
            Add Task
          </button>

          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              onKeyDown={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              role="button"
              tabIndex={0}
              aria-label="cancel adding a task"
            >
              Cancel
            </span>
          )}

          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
            role="button"
            tabIndex={0}
            aria-label="Show project overlay"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
            role="button"
            tabIndex={0}
            aria-label="Pick Task Date"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

export default AddTask;
