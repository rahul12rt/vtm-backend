'use strict';

/**
 * create-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::create-test.create-test');
