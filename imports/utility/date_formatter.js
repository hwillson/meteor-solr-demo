import moment from 'moment';

const DateFormatter = {
  format(date) {
    return moment(date).format('YYYY-MM-DD');
  },
};

export default DateFormatter;
