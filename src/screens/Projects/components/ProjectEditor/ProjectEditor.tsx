import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import { IProject } from '../../../../interfaces/Project';
import { IProjectEditorProps } from './ProjectEditor.types';
import './_styles.project-editor.scss';
import useStore from '../../../../store/store';

const ProjectEditor = ({ project, onSave }: IProjectEditorProps) => {
  const [projectDetails, setProjectDetails] = useState<IProject>(project);
  const { experiences } = useStore();

  useEffect(() => {
    setProjectDetails(project);
  }, [project]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(projectDetails);
  };

  return (
    <div className='project-editor' key={project.id}>
      <section>
        <div className='section-header'>
          <h3>About The Project</h3>
          <p>
            Fill in the information below to describe your professional
            experience.
          </p>
        </div>
        <div className='form-row'>
          <Input
            label='Project Name'
            placeholder='Super Cool Project'
            value={projectDetails.name}
            name='name'
            onChange={handleFieldChange}
            onBlur={handleSave}
          />
        </div>
      </section>
    </div>
  );
};

export default ProjectEditor;
