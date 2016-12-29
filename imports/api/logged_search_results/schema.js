import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const LoggedSearchResultSchema = new SimpleSchema({
  loggedSearchId: {
    type: String,
    label: 'Logged Search ID',
  },
  username: {
    type: String,
    label: 'Username',
    optional: true,
  },
  documentUrl: {
    type: String,
    label: 'Document URL',
  },
  page: {
    type: Number,
    label: 'Result Page',
  },
  timestamp: {
    type: Date,
    optional: true,
  },
});

export default LoggedSearchResultSchema;
