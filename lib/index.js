/**
 *
 * @api public
 */

var hitMixpanelAPI = require('./mixpanel.js');

/*  Function to hit the /jql endpoint of the Mixpanel API
** @param {string} secret API Secret from Mixpanel account
** @param {function} query JQL query inside 'function main()'
** @param {string} stringified params for the query used by mixpanel (ex: `{from_date:"2015-05-15", to_date:"2016-05-15"}`)
** @return {stream} Returns stream with data returned by API call
*/
function mixpanelJQL(secret, query, options) {
  var params = {
    script: query
  };
  if(typeof options ==="string") params.params = options;
  var str = hitMixpanelAPI(secret, 'jql', params);
  return str;
}

/*  Function to hit the /funnels endpoint of the Mixpanel API
** @param {string} secret API Secret from Mixpanel account
** @param {integer|string} funnelID ID of the funnel to inspect
** @param {object} options Optional parameter to include additional query parameters
** @return {stream} Returns stream with data returned by API call
*/
function mixpanelFunnel(secret, funnelID, options) {
  var params = {
    funnel_id: funnelID
  };
  if (options !== undefined) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        params[key] = options[key];
      }
    }
  }
  var str = hitMixpanelAPI(secret, 'funnels', params);
  return str;
}

module.exports.mixpanelJQL = mixpanelJQL;
module.exports.mixpanelFunnel = mixpanelFunnel;
