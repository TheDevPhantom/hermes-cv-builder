import { useEffect, useState } from 'react';
import { IEducation } from '../../../../interfaces/Education';
import { IEducationEditorProps } from './EducationEditor.types';
import './_styles.education-editor.scss';
import Input from '../../../../components/Input/Input';

const EducationEditor = ({ education, onSave }: IEducationEditorProps) => {
  const [educationDetails, setEducationDetails] =
    useState<IEducation>(education);

  useEffect(() => {
    setEducationDetails(education);
  }, [education]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationDetails({ ...educationDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(educationDetails);
  };

  return (
    <div className='education-editor'>
      <Input
        label='Degree'
        placeholder='Matric'
        value={educationDetails.degree}
        name='degree'
        onChange={handleFieldChange}
        onBlur={handleSave}
      />
      <Input
        label='School'
        placeholder='School'
        value={educationDetails.school}
        name='school'
        onChange={handleFieldChange}
        onBlur={handleSave}
      />
    </div>
  );
};

export default EducationEditor;
