'use strict';

/**
 * self-study service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::self-study.self-study');
