var dto = require('dto');

'use strict';
module.exports = (sequelize, DataTypes) => {
    var Log = sequelize.define('Log', {
            id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
            message: {type: DataTypes.STRING},
            level: {type: DataTypes.ENUM, values: ['INFO', 'DEBUG', 'WARN', 'ERROR', 'TRACE']},
        }
    );

//  Log.Revisions = Log.hasPaperTrail();

    Log.prototype.toDTO = function () {
        return JSON.stringify(dto.take.only(this.dataValues, ['message', 'level']));
    };

    return Log;
};