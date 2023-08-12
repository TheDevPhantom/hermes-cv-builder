import { FiShare2 } from 'react-icons/fi';
import './_styles.titlebar.scss';

const Titlebar = () => {
  return (
    <div className='titlebar'>
      <p>Adriaan Botha CV</p>
      <button>
        <FiShare2 />
        Share
      </button>
    </div>
  );
};

export default Titlebar;
