import React from 'react';

// bring projects Value from context
import { useProjectsValue } from '../context';

type Props = {
  setProject: any;
  showProjectOverlay: boolean;
  setShowProjectOverlay: any;
};

const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}: Props) => {
  // get projects
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map(
            (project: {
              name: string;
              projectId: React.Key | string | null | undefined;
            }) => (
              <li key={project.projectId} data-testid="project-overlay-action">
                <div
                  onClick={() => {
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }}
                  onKeyDown={() => {
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Select the task project"
                >
                  {project.name}
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    )
  );
};

export default ProjectOverlay;
