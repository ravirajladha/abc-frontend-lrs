import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li key={tab.name} className="nav-item">
            <a
              className={`nav-link ${activeTab === tab.name ? 'active' : ''}`}
              href="#!"
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content mt-3">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`tab-pane fade ${activeTab === tab.name ? 'show active' : ''}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
