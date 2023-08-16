import { FiShare2 } from 'react-icons/fi';
import './_styles.titlebar.scss';
import useStore from '../../store/store';

const Titlebar = () => {
  const { experiences, projects, profileDetails } = useStore();

  const onGenerate = () => {
    ipcRenderer.send('generate-pdf', {
      profileDetails,
      experiences,
      projects
    });
  };

  return (
    <div className='titlebar'>
      <p>Adriaan Botha CV</p>
      <button onClick={onGenerate}>
        <FiShare2 />
        Generate
      </button>
    </div>
  );
};

export default Titlebar;
