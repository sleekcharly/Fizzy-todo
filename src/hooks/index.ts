import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase';

// get moment
import moment from 'moment';

// get collatedTaskExists from helpers
import { collatedTasksExist } from '../helpers';

/***
  Fizzy-todo project hooks
* */

//  useTask hook
export const useTasks = (selectedProject: any) => {
  // set states
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe: any = firebase
      // get tasks from firebase that matches the userId
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'asdfghjkl');

    // if the selected project does not exist in the collatedTasksExists
    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? // if the selected project does not exist in the collatedTasksExists
          (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : // else check if selectedProject == TODAY
        selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY'), // moment is a package that managestimezones
          ))
        : // if the selectedProject matched the INBOX
        selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : // else return unsucbscribe task
          unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot: any) => {
      // set newTask from a snapshot of the unsubscribe task
      const newTasks = snapshot.docs.map((task: any) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        // if selectedProject key === NEXT_7
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task: any) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true,
            )
          : // else filter newTasks
            newTasks.filter(
              (task: { archived: boolean }) => task.archived !== true,
            ),
      );

      // set archived tasks
      setArchivedTasks(
        newTasks.filter(
          (task: { archived: boolean }) => task.archived !== false,
        ),
      );
    });

    return () => unsubscribe();
  }, [selectedProject]); // re-run when selectedProject changes

  return { tasks, archivedTasks };
};

// use Projects hook
export const useProjects = () => {
  // set states
  const [projects, setProjects] = useState<any>([]);

  // run use effect hook
  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'asdfghjkl')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
