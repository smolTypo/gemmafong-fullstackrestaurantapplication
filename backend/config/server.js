module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS','aW2olD4It8bifkvZIU2u+g==','QJhqnaA00qbYAhI20SjxJw==','zWOcDmYfk5qURWd9NOLldw==','3to5BodorPBGvtj4qD+hdA=='),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

