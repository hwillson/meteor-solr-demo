import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const loggedSearchSchema = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    optional: true,
  },
  keywords: {
    type: String,
    label: 'Keywords',
  },
  fields: {
    type: [String],
    label: 'Fields',
    optional: true,
  },
  numberOfResults: {
    type: Number,
    label: 'Nuber of Results',
  },
  timestamp: {
    type: Date,
  },
});

export default loggedSearchSchema;
