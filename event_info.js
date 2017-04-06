'use strict';

var rp = require('request-promise'),
  TODAY_EVENT = 'http://localhost:3000/api/v1/events/events_by_month/:month=',
  TODAY_EVENT = 'http://localhost:3000/api/v1/events/today_events';

module.change_code = 1;

function QHubDataHelper() {}

QHubDataHelper.prototype.getTodayEvents = function() {
  var options = {
    method: 'GET',
    uri: TODAY_EVENT,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

module.exports = QHubDataHelper;