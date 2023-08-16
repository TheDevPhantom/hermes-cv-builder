import { combineClassNames } from '../../utils/stringUtils';
import { ISidebarProps } from './Sidebar.types';
import './_styles.sidebar.scss';

const Sidebar = ({ activeTab, setActiveTab, tabs }: ISidebarProps) => {
  return (
    <div className='sidebar'>
      {tabs.map((tab, index) => (
        <button
          className={combineClassNames(
            'tab',
            'tip',
            'large',
            activeTab === tab ? 'active' : ''
          )}
          key={index}
          onClick={() => setActiveTab(tab)}
        >
          <div className='icon'>{tab.icon}</div>
          <span className='right'>{tab.title}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
