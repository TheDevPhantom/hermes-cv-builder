import { FcBriefcase, FcPlus } from 'react-icons/fc';
import './_styles.experience.scss';
import useStore from '../../store/store';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ExperienceItem from './components/ExperienceItem/ExperienceItem';
import ExperienceEditor from './components/ExperienceEditor/ExperienceEditor';
import ItemList from '../../components/ItemList/ItemList';
import { IExperience } from '../../interfaces/Experience';

const Experience = () => {
  const { experiences, updateExperiences } = useStore();

  const [activeExperienceIndex, setActiveExperienceIndex] = useState(-1);

  const addExperience = () => {
    const newExperiences = [
      ...experiences,
      {
        id: uuidv4(),
        title: '',
        company: '',
        location: '',
        overview: '',
        startDate: new Date()
      }
    ];
    updateExperiences(newExperiences);

    setActiveExperienceIndex(newExperiences.length - 1);
  };

  const handleSave = (experience: IExperience) => {
    const newExperiences = [...experiences];
    newExperiences[activeExperienceIndex] = experience;
    updateExperiences(newExperiences);
  };

  const handleDelete = (experience: IExperience) => {
    const newExperiences = experiences.filter(
      (item) => item.id !== experience.id
    );
    updateExperiences(newExperiences);
    setActiveExperienceIndex(-1);
  };

  return (
    <div className='experience-screen'>
      <ItemList icon={<FcBriefcase />} title='Experiences'>
        <div className='list-item' onClick={addExperience}>
          <span className='list-item-icon'>
            <FcPlus />
          </span>
          <div className='list-item-content'>
            <p className='list-item-title'>New Experience</p>
            <p className='list-item-subtitle'>Add a new work experience</p>
          </div>
        </div>
        {experiences.map((experience, index) => (
          <ExperienceItem
            onClick={() => setActiveExperienceIndex(index)}
            isActive={index === activeExperienceIndex}
            experience={experience}
            key={experience.id}
          />
        ))}
      </ItemList>
      {activeExperienceIndex > -1 && (
        <ExperienceEditor
          experience={experiences[activeExperienceIndex]}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Experience;
