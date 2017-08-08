const moment = require('moment');

var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url:`https://google.com/maps?q=${latitude},${longitude}`,
        createdAt:moment().valueOf()
        
    };
};

module.exports = generateLocationMessage;