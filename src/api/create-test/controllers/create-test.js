'use strict';

/**
 * create-test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::create-test.create-test');
