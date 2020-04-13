import React, {useState} from 'react';

// react icons stuff
import {
    FaChevronDown,
    FaInbox,
    FaRegCalendarAlt,
    FaRegCalendar,
} from 'react-icons/fa';

import { Projects } from '../Projects'
import { AddProject } from '../AddProject';

// context stuff
import { useSelectedProjectValue } from '../../context';

export const Sidebar = () => {
    const { setSelectedProject } = useSelectedProjectValue();
    const [ active, setActive ] = useState('inbox');
    const [ showProjects, setShowProjects ] = useState(true);

    return (
        // data-testid for react testing library
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <li 
                    data-testid="inbox" 
                    className={active === 'inbox' ? 'active' : undefined}
                >
                    <div
                        data-testid="inbox-action"
                        aria-label="Show Inbox Tasks"
                        tabIndex={0}
                        role="button"
                        onClick = {() => {
                            setActive('inbox');
                            setSelectedProject('INBOX');
                        }}
                        onKeyDown = {() => {
                            setActive('inbox');
                            setSelectedProject('INBOX');
                        }}
                    >
                        <span>
                            <FaInbox />
                        </span>
                        <span>Inbox</span>
                    </div>
                </li>
                <li 
                    data-testid="today" 
                    className={active === 'today' ? 'active' : undefined}
                >
                    <div
                        data-testid="today-action"
                        aria-label="Today's task"
                        tabIndex={0}
                        role="button"
                        onClick = {() => {
                            setActive('today');
                            setSelectedProject('TODAY');
                        }}
                        onKeyDown = {() => {
                            setActive('today');
                            setSelectedProject('TODAY');
                        }}
                    >
                        <span>
                            <FaRegCalendar />
                        </span>
                        <span>Today</span>
                    </div>  
                </li>
                <li 
                    data-testid="next_7" 
                    className={active === 'next_7' ? 'active' : undefined}
                >
                    <div
                        data-testid="next_7-action"
                        aria-label="Tasks scheduled for next week"
                        onClick = {() => {
                            setActive('next_7');
                            setSelectedProject('NEXT_7');
                        }}
                        onKeyDown = {() => {
                            setActive('next_7');
                            setSelectedProject('NEXT_7');
                        }}
                        tabIndex={0}
                        role="button"
                    >
                        <span>
                            <FaRegCalendarAlt />
                        </span>
                        <span>Next 7 days</span>
                    </div>                    
                </li>
            </ul>

            <div 
                aria-label="Show Projects"
                className="sidebar__middle"
                onClick={() => setShowProjects(!showProjects)}
                onKeyDown={() => setShowProjects(!showProjects)}
            >
                <span>
                    <FaChevronDown 
                        className={!showProjects ? 'hidden-projects': undefined}
                    />
                </span>
                <h2>Projects</h2>
            </div>

            <ul className="sidebar__projects">
                {showProjects && <Projects />}
            </ul>

            {showProjects && <AddProject />}
            
        </div>
    )    
};
