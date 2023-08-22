import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import { IProject } from '../../../../interfaces/Project';
import { IProjectEditorProps } from './ProjectEditor.types';
import './_styles.project-editor.scss';
import useStore from '../../../../store/store';
import Select from '../../../../components/Select/Select';

const ProjectEditor = ({ project, onSave, onDelete }: IProjectEditorProps) => {
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

  useEffect(() => {
    handleSave();
  }, [projectDetails.company]);

  const handleDelete = async () => {
    onDelete(projectDetails);
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
        <div className='include-in-project'>
          <input
            type='checkbox'
            id='includeInPdf'
            name='includeInPdf'
            checked={projectDetails.includeInPdf ?? false}
            onChange={(e) => {
              setProjectDetails({
                ...projectDetails,
                includeInPdf: e.target.checked
              });
              onSave({ ...projectDetails, includeInPdf: e.target.checked });
            }}
          />
          <label htmlFor='includeInPdf'>Include in PDF</label>
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
          <Select
            label='Linked Experience'
            options={[
              { value: '', label: 'None' },
              ...experiences.map((experience) => ({
                label: experience.company,
                value: experience.id
              }))
            ]}
            value={projectDetails.company}
            onChange={(value) => {
              setProjectDetails({ ...projectDetails, company: value });
            }}
          />
        </div>
        <div className='form-row'>
          <div className='form-row'>
            <Input
              label='Start Date'
              value={projectDetails.startDate}
              type='date'
              name='startDate'
              onChange={handleFieldChange}
              onBlur={handleSave}
            />
            <Input
              label='End Date'
              value={projectDetails.endDate}
              type='date'
              name='endDate'
              onChange={handleFieldChange}
              onBlur={handleSave}
            />
          </div>
          <Input
            label='Role'
            placeholder='Lead Developer'
            value={projectDetails.role}
            name='role'
            onChange={handleFieldChange}
            onBlur={handleSave}
          />
        </div>
        <Input
          label='Link to Project'
          placeholder='(Optional)'
          value={projectDetails.link}
          name='link'
          onChange={handleFieldChange}
          onBlur={handleSave}
        />
        <Input
          label='Overview'
          placeholder='Write an overview of the project here...'
          value={projectDetails.description}
          type='textarea'
          name='description'
          rows={5}
          onChange={handleFieldChange}
          onBlur={handleSave}
        />
        <Input
          label='Skills/Technologies Used'
          placeholder='React, Node.js, etc.'
          value={projectDetails.technologies}
          name='technologies'
          onChange={handleFieldChange}
          onBlur={handleSave}
        />
      </section>
      <div className='delete' onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
};

export default ProjectEditor;
