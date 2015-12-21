FlowRouter.route('/', {
  name: 'search',
  action() {
    ReactLayout.render(MainLayout, { content: <Search /> });
  }
});
