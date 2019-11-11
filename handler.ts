import 'source-map-support/register';
import torreController from './src/controllers/torreController';

exports.search = torreController.search;
exports.queryProfile = torreController.profile;
exports.queryConnections = torreController.connections;


