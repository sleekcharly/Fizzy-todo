import moment from 'moment';
import React from 'react';
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa';

type Props = {
  setTaskDate: any;
  showTaskDate: boolean;
  setShowTaskDate: any;
};

const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }: Props) =>
  showTaskDate && (
    <div className="task-date" date-testid="task-date-overlay">
      <ul className="task-date__list">
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
          data-testid="task-date-today"
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
          }}
          data-testid="task-date-tomorrow"
        >
          <span>
            <FaSun />
          </span>
          <span>Tomorrow</span>
        </li>

        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
          }}
          data-testid="task-date-next-week"
        >
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Next week</span>
        </li>
      </ul>
    </div>
  );

export default TaskDate;
