import { FcDiploma1 } from 'react-icons/fc';
import { checkEmpty, combineClassNames } from '../../../../utils/stringUtils';
import { IEducationItemProps } from './EducationItem.types';

const EducationItem = ({
  experience,
  onClick,
  isActive
}: IEducationItemProps) => {
  return (
    <div
      className={combineClassNames('list-item', isActive ? 'active' : '')}
      onClick={onClick}
    >
      <span className='list-item-icon'>
        <FcDiploma1 />
      </span>
      <div className='list-item-content'>
        <p className='list-item-title'>
          {checkEmpty(experience.degree, <i>No Degree</i>)}
        </p>
        <p className='list-item-subtitle'>
          {checkEmpty(experience.school, <i>No School</i>)}
        </p>
      </div>
    </div>
  );
};

export default EducationItem;
