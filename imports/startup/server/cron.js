import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import moment from 'moment';

import SearchSummaryService from '../../api/reporting/search_summary_service';
import LoggedSearches from '../../api/logged_searches/collection';
import LoggedSearchResults from '../../api/logged_search_results/collection';

let cronEnabled = false;

if (Meteor.settings.private.analytics.jobs.export.enabled) {
  SyncedCron.add({
    name: 'Export analytics summary',
    schedule(parser) {
      return parser.text(
        Meteor.settings.private.analytics.jobs.export.schedule
      );
    },
    job() {
      const timeNow = moment();
      const startTime = timeNow.subtract(1, 'hour').toDate();
      const stopTime = timeNow.toDate();
      SearchSummaryService.sendSearchSummariesToReportingSystem(
        startTime,
        stopTime,
      );
    },
  });
  cronEnabled = true;
}

if (Meteor.settings.private.analytics.jobs.cleanup.enabled) {
  SyncedCron.add({
    name: 'Remove old analytics',
    schedule(parser) {
      return parser.text(
        Meteor.settings.private.analytics.jobs.cleanup.schedule
      );
    },
    job() {
      const monthRetainCount =
        Meteor.settings.private.analytics.jobs.cleanup.monthRetainCount;
      const cutoffDate = moment().subtract(monthRetainCount, 'months').toDate();
      LoggedSearchResults.removeResultsOlderThan(cutoffDate);
      LoggedSearches.removeSearchesOlderThan(cutoffDate);
    },
  });
  cronEnabled = true;
}

if (cronEnabled) {
  SyncedCron.start();
}
