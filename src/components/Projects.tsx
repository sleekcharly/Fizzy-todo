import React, { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import IndividualProject from './IndividualProject';

type Props = {
  activeValue: string | null;
};

const Projects = ({ activeValue = null }: Props) => {
  // set Projects state values
  const [active, setActive] = useState(activeValue);

  // bring in context value
  const { setSelectedProject }: any = useSelectedProjectValue();
  const { projects }: any = useProjectsValue();

  return (
    projects &&
    projects.map((project: any) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action-parent"
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onKeyDown={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

export default Projects;
