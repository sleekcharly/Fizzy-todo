import {useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';

/***
  Fizzy-todo project hooks
* */
// useTasks hook
export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase 
            // get tasks from firebase that matches the userId
            .firestore()
            .collection('tasks')
            .where('userId', '==', 'asdfghjkl');

            // if the selected project does not exist in the collatedTasksExists
            unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ?

            // then check through the tasks where selectedproject matched the projectId
            (unsubscribe = unsubscribe.where('projectId', '==' , selectedProject))

            // else check if selectedProject == TODAY
            : selectedProject === 'TODAY'
            ? (unsubscribe = unsubscribe.where(
                'date', 
                '==', 
                moment().format('DD/MM/YYYY')
            ))

            // if the selectedProject matched the INBOX
            : selectedProject === 'INBOX' || selectedProject === 0
            ? (unsubscribe = unsubscribe.where('date', '==', ''))

            // else return unsucbscribe task
            : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {

            // set newTask from a snapshot of the unsubscribe task
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                // if selectedProject key === NEXT_7
                selectedProject === 'NEXT_7'
                 ? newTasks.filter(
                     task => 
                        moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                        task.archived !== true
                 )
                 // else filter newTasks
                 : newTasks.filter(task => task.archived !== true)
            );
            
            // set archived tasks
            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        });

        return () => unsubscribe();
    }, [selectedProject]); // re-run when selectedProject changes

    return  { tasks, archivedTasks };
}




// useProjects hook
export const useProjects = () => {
    // set up state.
    const [projects, setProjects] = useState([]);

    // set up useEffect
    useEffect(() => {
        firebase 
            .firestore()
            .collection('projects') // locate collection
            .where('userId', '==', 'asdfghjkl') // match userId
            .orderBy('projectId') // order by project (default asc)
            .get()

            // get a snapshot of the data retrieved
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id,
                }));

                // update state if allProjects is not equal to projects
                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                }
            });
           
    }, [projects]); // monitor changes in projects and re-run

    return  { projects, setProjects };
};