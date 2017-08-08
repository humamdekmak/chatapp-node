var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url:`https://google.com/maps?q=${latitude},${longitude}`,
        createdAt:new Date().getTime()
        
    };
};

module.exports = generateLocationMessage;