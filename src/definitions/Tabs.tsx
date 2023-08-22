import {
  FcBriefcase,
  FcContacts,
  FcFaq,
  FcGraduationCap,
  FcIdea,
  FcOpenedFolder
} from 'react-icons/fc';
import Profile from '../screens/Profile/Profile';
import Experience from '../screens/Experience/Experience';
import Education from '../screens/Education/Education';
import Projects from '../screens/Projects/Projects';
import Skills from '../screens/Skills/Skills';

export interface ITab {
  icon: JSX.Element;
  title: string;
  screen: JSX.Element;
}

export default [
  {
    icon: <FcContacts />,
    title: 'Profile',
    screen: <Profile />
  },
  {
    icon: <FcBriefcase />,
    title: 'Experience',
    screen: <Experience />
  },
  {
    icon: <FcGraduationCap />,
    title: 'Education',
    screen: <Education />
  },
  {
    icon: <FcOpenedFolder />,
    title: 'Projects',
    screen: <Projects />
  }
  //   {
  //     icon: <FcFaq />,
  //     title: 'Languages',
  //     screen: <div>Languages</div>
  //   }
];
