var request = require('request');

module.exports = function (req, res, next) {
  var id = req.query.id;
  var sheet = req.query.sheet || 1;
  var useIntegers = req.query.integers || true;
  var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json';

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(response.body);
      var responseObj = {};
      var categories = {};
      var currCat = '';
      if (data && data.feed && data.feed.entry) {
        for (var i = 0; i < data.feed.entry.length; i++) {
          var entry = data.feed.entry[i];
          var keys = Object.keys(entry);
          var newRow = {};
          var newCategory = [];
          for (var j = 0; j < keys.length; j++) {
            var gsxCheck = keys[j].indexOf('gsx$');
            if (gsxCheck > -1) {
              var key = keys[j];
              var name = key.substring(4);
              var content = entry[key];
              var value = content.$t;
              if (useIntegers === true && !isNaN(value)) {
                value = Number(value);
              }
              if (name == 'category') {
                console.log('Adding video object to category: '+value);
                if (!(value in categories)){
                  categories[value] = newCategory;
                }
                currCat = value;
              } else {
                console.log('Adding '+name+' element');
                if(name == 'sources'){
                    newRow[name] = [value];
                } else {
                    newRow[name] = value;
                }
              }
            }
          }
          categories[currCat].push(newRow);
        }

        responseContent = [];
        for (var category in categories){
          responseContent.push(
                {
                  'category' : category,
                  'videos' : categories[category]
                });
        }

        responseObj['chariotvideos'] = responseContent;

        return res.status(200).json(responseObj);
      } else {
        return res.status(response.statusCode).json(error);
      }
    }
  });
};