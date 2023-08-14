import { FcFolder } from 'react-icons/fc';
import { checkEmpty, combineClassNames } from '../../../../utils/stringUtils';
import { IProjectItemProps } from './ProjectItem.types';

const ProjectItem = ({ project, onClick, isActive }: IProjectItemProps) => {
  return (
    <div
      className={combineClassNames('list-item', isActive ? 'active' : '')}
      onClick={() => onClick(project.id)}
    >
      <span className='list-item-icon'>
        <FcFolder />
      </span>
      <div className='list-item-content'>
        <p className='list-item-title'>
          {checkEmpty(project.name, <i>No Name</i>)}
        </p>
        {/* <p className='list-item-subtitle'>
            {checkEmpty(project., <i>No School</i>)}
          </p> */}
      </div>
    </div>
  );
};

export default ProjectItem;
