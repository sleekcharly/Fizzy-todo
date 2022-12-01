// header component for the application

import React, { useState } from 'react';

// Import icons
import { FaPizzaSlice } from 'react-icons/fa';
import AddTask from '../AddTask';

type Props = {
  darkMode: boolean;
  setDarkMode: any;
};

// The data-testid prop is added for testing purposes
const Header = ({ darkMode, setDarkMode }: Props) => {
  //  component state
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      {/* navigation section */}
      <nav>
        {/* Project logo */}
        <div className="logo">
          <img src="/images/logo.png" alt="Fizzy Todo" />
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-action" className="settings__add">
              <button
                aria-label="Quick Add Task"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
                onKeyDown={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li data-testid="dark-mode-action" className="settings__darkmode">
              <button
                aria-label="DarkMode on/off"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                onKeyDown={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        showShouldMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

export default Header;
