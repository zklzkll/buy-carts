import { Tabs } from 'antd';
import { MediaType, useCustomContext } from '../../layouts/CustomContext';

interface TabItem {
  key: string;
  label: string;
}

const { TabPane } = Tabs;
interface TabsProps {
  activeTab: MediaType;
  tabLabels: TabItem[];
  handleTabChange: (key: any) => void;
  children?: React.ReactNode;
}

const CustomTabs: React.FC<TabsProps> = (props) => {
  const { activeTab, tabLabels, handleTabChange, children } = props;


  return (
    <Tabs activeKey={activeTab} onChange={handleTabChange}>
      {tabLabels.map((tab) => (
        <TabPane
          tab={<span aria-label={tab.label}>{tab.label}</span>}
          key={tab.key}
          className="custom-tab-pane"
        >
          {children}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default CustomTabs;