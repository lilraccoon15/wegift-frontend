import { useState } from "react";
import type { ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
  key: string | number;
}

interface TabSwitcherProps {
  tabs: Tab[];
  initialTab?: string | number;
  className?: string;
}

const TabSwitcher = ({
  tabs,
  initialTab,
  className = "",
}: TabSwitcherProps) => {
  const [activeTab, setActiveTab] = useState<string | number>(
    initialTab ?? tabs[0].key
  );

  return (
    <>
      <div className={`dashboard-nav ${className}`}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </>
  );
};

export default TabSwitcher;
