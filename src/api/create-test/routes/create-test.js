'use strict';

/**
 * create-test router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::create-test.create-test');
