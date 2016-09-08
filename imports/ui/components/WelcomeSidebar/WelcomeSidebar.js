import React from 'react';

const WelcomSidebar = () => (
  <aside className="welcome-sidebar">
    <div className="promo">
      <img src="/images/promo.png" alt="Search promo graphic" />
    </div>
    <div className="panel panel-default help-panel">
      <div className="panel-heading clearfix">
        <strong>Need Help?</strong>
      </div>
      <div className="panel-body">
        Help instructions go here ...
      </div>
    </div>
  </aside>
);

export default WelcomSidebar;
