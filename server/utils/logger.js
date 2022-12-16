const winston = require("winston");
const logConfiguration = {
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'MM-DD-YYYY hh:mm:ss:mm'
        }),
        winston.format.printf(info => `${[info.timestamp]} - ${info.level} - ${info.message}`),
    )
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger