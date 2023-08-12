import { useState } from 'react';
import Titlebar from './components/Titlebar/Titlebar';
import Tabs from './definitions/Tabs';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState(Tabs[0]);

  return (
    <>
      <Titlebar />
      <div className='body'>
        <Sidebar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          tabs={Tabs}
        />
        <div className='content'>
          <div className='screen'>{activeTab.screen}</div>
        </div>
      </div>
    </>
  );
}

export default App;
