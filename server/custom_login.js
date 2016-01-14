Accounts.registerLoginHandler((loginRequest) => {

  const username = loginRequest.user.username;
  let userId;
  const user = Meteor.users.findOne({ username });
  if (!user) {
    userId = Meteor.users.insert({ username });
  } else {
    userId = user._id;
  }

  return {
    userId
  };

});
