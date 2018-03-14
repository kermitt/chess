
function getNewMap () {
  let map = {
    'message|log|name': '',
    'message|log|msg': '',
    'message|log|messageBody|CampaignDetails|campaign_vendor_value': '',
    'message|log|messageBody|CampaignDetails|campaign_name': '',
    'message|log|messageBody|CampaignDetails|campaign_event_type_value': '',
    'message|attrs|tier': '',
    'message|attrs|service_name': '',
    'message|attrs|env': '',
    'message|attrs|env': '',
    'fields|service_name': '',
    '@timestamp': '',
    'workflow': ''
  }
  return map
}
let a = getNewMap()
a['workflow'] = 'hello there'

let b = getNewMap()
b['workflow'] = 'goat'

a['@timestamp'] = 'findme'

console.log(JSON.stringify(a, null, 6))
console.log(JSON.stringify(b, null, 6))
console.log(JSON.stringify(a, null, 6))
