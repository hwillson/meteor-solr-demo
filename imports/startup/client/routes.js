import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Layout from '../../ui/components/Layout/Layout';
import Search from '../../ui/pages/Search';

FlowRouter.route('/', {
  name: 'search',
  action() {
    mount(Layout, {
      content: <Search />,
    });
  },
});
