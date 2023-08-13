import { FcGraduationCap, FcPlus } from 'react-icons/fc';
import './_styles.education.scss';
import ItemList from '../../components/ItemList/ItemList';
import useStore from '../../store/store';
import EducationItem from './components/EducationItem/EducationItem';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EducationEditor from './components/EducationEditor/EducationEditor';
import { IEducation } from '../../interfaces/Education';

const Education = () => {
  const { educations, updateEducations } = useStore();
  const [activeEducationIndex, setActiveEducationIndex] = useState(-1);

  const addEducation = () => {
    const newEducations = [
      ...educations,
      {
        id: uuidv4(),
        degree: '',
        school: '',
        location: '',
        overview: '',
        startDate: new Date()
      }
    ];
    updateEducations(newEducations);

    setActiveEducationIndex(newEducations.length - 1);
  };

  const handleSave = (experience: IEducation) => {
    const newEducations = [...educations];
    newEducations[activeEducationIndex] = experience;
    updateEducations(newEducations);
  };

  return (
    <div className='experience-screen'>
      <ItemList icon={<FcGraduationCap />} title='Education'>
        <div className='list-item' onClick={addEducation}>
          <span className='list-item-icon'>
            <FcPlus />
          </span>
          <div className='list-item-content'>
            <p className='list-item-title'>New Education</p>
            <p className='list-item-subtitle'>Add a new education</p>
          </div>
        </div>
        {educations.map((experience, index) => (
          <EducationItem
            onClick={() => setActiveEducationIndex(index)}
            isActive={index === activeEducationIndex}
            experience={experience}
            key={experience.id}
          />
        ))}
      </ItemList>
      {activeEducationIndex > -1 && (
        <EducationEditor
          education={educations[activeEducationIndex]}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Education;
