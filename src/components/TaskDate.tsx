import React from 'react';
import moment from 'moment';
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa';

type Props = {
  setTaskDate: any;
  showTaskDate: boolean;
  setShowTaskDate: any;
};

const TaskDate: any = ({ setTaskDate, showTaskDate, setShowTaskDate }: Props) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li data-testid="task-date-today">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select today as the task date"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li data-testid="task-date-tomorrow">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>

        <li data-testid="task-date-next-week">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select next week as the task date"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );

export default TaskDate;
