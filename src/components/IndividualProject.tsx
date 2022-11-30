import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';

type Props = {
  project: {
    name: string;
    docId: string;
  };
};

const IndividualProject = ({ project }: Props) => {
  // component state
  const [showConfirm, setShowConfirm] = useState(false);

  // bring in context values
  const { projects, setProjects }: any = useProjectsValue();
  const { setSelectedProject }: any = useSelectedProjectValue();

  // delte project from firebase functionality
  const deleteProject = (docId: string) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };

  return (
    <div className="sidebar__project-container">
      <span className="sidebar__dot">•</span>{' '}
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onKeyDown={() => setShowConfirm(!showConfirm)}
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>

              <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

export default IndividualProject;
