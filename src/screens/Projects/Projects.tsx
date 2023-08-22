import { FcOpenedFolder, FcPlus } from 'react-icons/fc';
import ItemList from '../../components/ItemList/ItemList';
import './_styles.projects.scss';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../../store/store';
import { useState } from 'react';
import ProjectItem from './components/ProjectItem/ProjectItem';
import ProjectEditor from './components/ProjectEditor/ProjectEditor';
import { IProject } from '../../interfaces/Project';
import GroupedProjects from './components/GroupedProjects/GroupedProjects';

const Projects = () => {
  const { projects, updateProjects, experiences } = useStore();

  const [activeProjectIndex, setActiveProjectIndex] = useState(-1);

  const addProject = () => {
    const newProjects = [
      ...projects,
      {
        id: uuidv4(),
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        technologies: [],
        role: '',
        link: '',
        responsibilities: [],
        company: ''
      }
    ];
    updateProjects(newProjects);

    setActiveProjectIndex(newProjects.length - 1);
  };

  const handleSave = (project: IProject) => {
    const newProjects = [...projects];
    newProjects[activeProjectIndex] = project;
    updateProjects(newProjects);
  };

  const groupByCompany = (projects: IProject[]) => {
    const groupedProjects: { [key: string]: IProject[] } = {};
    projects.forEach((project) => {
      if (!groupedProjects[project.company]) {
        groupedProjects[project.company] = [];
      }
      groupedProjects[project.company].push(project);
    });

    return groupedProjects;
  };

  const handleDelete = (project: IProject) => {
    const newProjects = projects.filter((item) => item.id !== project.id);
    updateProjects(newProjects);
    setActiveProjectIndex(-1);
  };

  return (
    <div className='projects-screen'>
      <ItemList icon={<FcOpenedFolder />} title='Projects'>
        <div className='list-item' onClick={addProject}>
          <span className='list-item-icon'>
            <FcPlus />
          </span>
          <div className='list-item-content'>
            <p className='list-item-title'>New Project</p>
            <p className='list-item-subtitle'>Add a new project</p>
          </div>
        </div>
        {Object.keys(groupByCompany(projects)).map((experience) => (
          <>
            <GroupedProjects
              key={experience}
              title={experiences.find((exp) => exp.id === experience)?.company}
              projects={groupByCompany(projects)[experience]}
              onProjectClick={(id) =>
                setActiveProjectIndex(
                  projects.findIndex((project) => project.id === id)
                )
              }
              activeProjectId={projects[activeProjectIndex]?.id}
            />
          </>
        ))}
      </ItemList>
      {activeProjectIndex > -1 && (
        <ProjectEditor
          project={projects[activeProjectIndex]}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Projects;
