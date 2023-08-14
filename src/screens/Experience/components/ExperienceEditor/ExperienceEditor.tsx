import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import { IExperienceEditorProps } from './ExperienceEditor.types';
import './_styles.experience-editor.scss';
import { IExperience } from '../../../../interfaces/Experience';
import useStore from '../../../../store/store';
import { maxCharacters } from '../../../../utils/stringUtils';

const ExperienceEditor = ({
  experience,
  onSave,
  onDelete
}: IExperienceEditorProps) => {
  const [experienceDetails, setExperienceDetails] =
    useState<IExperience>(experience);
  const projects = useStore((state) =>
    state.projects.filter((project) => project.company === experience.id)
  );

  useEffect(() => {
    setExperienceDetails(experience);
  }, [experience]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperienceDetails({ ...experienceDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(experienceDetails);
  };

  const handleDelete = async () => {
    onDelete(experienceDetails);
  };

  return (
    <div className='experience-editor' key={experience.id}>
      <section>
        <div className='section-header'>
          <h3>About</h3>
          <p>
            Fill in the information below to describe your professional
            experience.
          </p>
        </div>
        <div className='form-row'>
          <Input
            label='Job Title'
            placeholder='Software Engineer'
            value={experienceDetails.title}
            name='title'
            onChange={handleFieldChange}
            onBlur={handleSave}
          />
          <Input
            label='Company'
            placeholder='Apple'
            value={experienceDetails.company}
            name='company'
            onChange={handleFieldChange}
            onBlur={handleSave}
          />
        </div>
        <div className='form-row'>
          <div className='form-row'>
            <Input
              label='Start Date'
              value={experienceDetails.startDate}
              type='date'
              name='startDate'
              onChange={handleFieldChange}
              onBlur={handleSave}
            />
            <Input
              label='End Date'
              value={experienceDetails.endDate}
              type='date'
              name='endDate'
              onChange={handleFieldChange}
              onBlur={handleSave}
            />
          </div>
          <Input
            label='Location'
            placeholder='Paris, France'
            value={experienceDetails.location}
            name='location'
            onChange={handleFieldChange}
            onBlur={handleSave}
          />
        </div>
        <Input
          label='Overview'
          placeholder='Write your professional overview here...'
          value={experienceDetails.overview}
          type='textarea'
          name='overview'
          rows={10}
          onChange={handleFieldChange}
          onBlur={handleSave}
        />
      </section>
      <section>
        <div className='section-header'>
          <h3>Projects</h3>
          <p>
            Projects that you have worked on during your time at this company.
          </p>
        </div>
        {projects.map((project) => (
          <div className='project-card'>
            <div className='project-card-header'>
              <h4>{project.name}</h4>
              <p>{experienceDetails.company}</p>
            </div>
            <div className='project-card-body'>
              <p>{maxCharacters(project.description, 150)}</p>
            </div>
          </div>
        ))}
      </section>
      <section>
        <div className='section-header'>
          <h3>Skills</h3>
          <p>
            Add skills that you have gained and/or improved during your time at
            this company.
          </p>
        </div>
      </section>
      <div className='delete' onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
};

export default ExperienceEditor;
