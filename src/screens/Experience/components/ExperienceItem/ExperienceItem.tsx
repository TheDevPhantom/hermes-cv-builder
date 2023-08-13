import { FcBusiness } from 'react-icons/fc';
import { checkEmpty, combineClassNames } from '../../../../utils/stringUtils';
import { IExperienceItemProps } from './ExperienceItem.types';
import moment from 'moment';

const ExperienceItem = ({
  experience,
  onClick,
  isActive
}: IExperienceItemProps) => {
  const getDuration = () => {
    const startDate = moment(experience.startDate);
    const endDate = experience.endDate ? moment(experience.endDate) : moment();
    const duration = moment.duration(endDate.diff(startDate));
    const years = duration.years();
    const months = duration.months();
    const yearString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthString =
      months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
    return `${yearString} ${monthString}`;
  };

  return (
    <div
      className={combineClassNames('list-item', isActive ? 'active' : '')}
      onClick={onClick}
    >
      <span className='list-item-icon'>
        <FcBusiness />
      </span>
      <div className='list-item-content'>
        <p className='list-item-title'>
          {checkEmpty(experience.title, <i>No Title</i>)}
        </p>
        <p className='list-item-subtitle'>
          {checkEmpty(experience.company, <i>No Company</i>)} |{' '}
          {checkEmpty(getDuration(), <i>No Location</i>)}
        </p>
      </div>
    </div>
  );
};

export default ExperienceItem;
