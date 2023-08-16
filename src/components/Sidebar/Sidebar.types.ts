import { ITab } from '../../definitions/Tabs';

export interface ISidebarProps {
  activeTab: ITab;
  setActiveTab: (tab: ITab) => void;
  tabs: ITab[];
}
