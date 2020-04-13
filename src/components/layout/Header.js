import React, {useState} from 'react';
import { AddTask } from '../AddTask';

// react-icons stuff
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = ({ darkMode, setDarkMode }) => {
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);

    return (
        // data-testid is for header component test carried out later while testing
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo.jpg" alt="fizzy todo" />
                </div>
                <div className="settings">
                    <ul>
                        <li className="settings__add">
                            <button
                                data-testid="quick-add-task-action"
                                aria-label="Quick Add task"
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

                        <li className="settings__darkmode">
                            <button
                                data-testid="dark-mode-action" 
                                aria-label="Set Dark mode"
                                type="button"
                                onClick={() => setDarkMode(!darkMode)}
                                onKeyDown={() => setDarkMode(!darkMode)}
                            >
                                <FaPizzaSlice />   {/*install react-icons for pizza slice icon*/}
                            </button>
                        </li> 
                    </ul>
                </div>
            </nav>

            <AddTask 
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    );
}