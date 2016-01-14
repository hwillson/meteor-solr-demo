AccountsTemplates.configure({

  defaultLayoutType: 'blaze-to-react',
  defaultTemplate: 'fullPageAtForm',
  defaultLayout: Layout,
  defaultLayoutRegions: {},
  defaultContentRegion: 'content',
  forbidClientAccountCreation: true,
  focusFirstInput: true,

  texts: {
    title: {
      signIn: 'Meteor Solr Search Login'
    },
    button: {
      signIn: 'Login'
    }
  }

});

const passwordField = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: 'Username',
    required: true
  },
  passwordField
]);

Package['accounts-password'] = {};
Meteor.loginWithPassword = (user, password, callback) => {
  const loginRequest = { user, customPassword: password };
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};
