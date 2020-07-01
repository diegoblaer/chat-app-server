const moment = require('moment')

const generateMessage = (user, text) => {
    return {
        author: user,
        text,
        createdAt: moment(new Date().getTime()).format('HH:mm')                
    }
}


module.exports = {
    generateMessage
};