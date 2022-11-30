import { collatedTasks } from '../constants';

export const getTitle = (projects: any[], projectId: string) =>
  projects.find(
    (project: { projectId: string }) => project.projectId === projectId,
  );

export const getCollatedTitle = (projects: any[], key: any) =>
  projects.find((project: { key: any }) => project.key === key);

export const collatedTasksExist = (selectedProject: any) =>
  collatedTasks.find((task) => task.key === selectedProject);

/******
 * helper function for generating a random ID while creating tasks
 *******/
export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const lastRandChars: any[] = [];

  return function () {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
