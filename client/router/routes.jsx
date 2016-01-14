FlowRouter.route('/', {
  name: 'search',
  action() {
    ReactLayout.render(Layout, { content: <Search /> });
  }
});

FlowRouter.route('/logout', {
  name: 'logout',
  action() {
    Meteor.logout(() => {
      FlowRouter.redirect('/');
    });
  }
});

AccountsTemplates.configureRoute('signIn');
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);
