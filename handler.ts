import 'source-map-support/register';
import torreController from './src/controllers/torreController';

exports.querySearch = torreController.query;
exports.queryProfile = torreController.profile;
exports.queryConnections = torreController.connections;


