const _ = require('lodash');
const config = require('config');
const { Forbidden } = require('@feathersjs/errors');
const logger = require('../../logger');

exports.Webhooks = class Webhooks {
  constructor(config, app) {
    this.config = config;
    this.app = app;
  }

  webinar = async (data, params) => {
    const zoomConfig = config.get('zoom');

    const verificationToken = _.get(params, 'token');
    const event = _.get(data, 'event');
    const webinarTopic = _.get(data, 'payload.object.topic');

    if (verificationToken !== zoomConfig.verificationToken) {
      throw new Forbidden('Wrong verification token');
    }
    if (!_.includes(webinarTopic, zoomConfig.webinarGroup)) {
      throw new Forbidden('Wrong webinar group');
    }
    if (event !== 'webinar.participant_joined') {
      throw new Forbidden('Wrong event');
    }

    const participant = _.get(data, 'payload.object.participant');
    const id = _.get(participant, 'user_id');
    const name = _.get(participant, 'user_name');
    const joinDate = _.get(participant, 'join_time');

    const sequelize = this.app.get('sequelizeClient');

    const [participantRecord, isParticipantCreated] = await sequelize
      .model('webinar_participants')
      .upsert({ id, name }, { returning: true });

    logger.info(JSON.stringify({ participantRecord, isParticipantCreated }));

    const [joinRecord, isJoinCreated] = await sequelize
      .model('webinar_joins')
      .upsert({ participantId: id, webinarTopic, joinDate }, { returning: true });

    logger.info(JSON.stringify({ joinRecord, isJoinCreated }));

    return { isParticipantCreated, isJoinCreated };
  };
};
