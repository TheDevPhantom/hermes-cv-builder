import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ProjectItem from '../ProjectItem/ProjectItem';
import { GroupedProjectsProps } from './GroupedProjects.types';
import './_styles.grouped-projects.scss';
import { useState } from 'react';

const GroupedProjects = ({
  projects,
  title,
  onProjectClick,
  activeProjectId
}: GroupedProjectsProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className='grouped-projects'>
      <div className='title' onClick={() => setCollapsed(!collapsed)}>
        <p>{title ?? 'Freelance'}</p>
        {collapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      {!collapsed &&
        projects.map((project) => (
          <ProjectItem
            onClick={onProjectClick}
            isActive={project.id === activeProjectId}
            project={project}
            key={project.id}
          />
        ))}
    </div>
  );
};

export default GroupedProjects;
