import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('authenticated', { path: '' }, function() {
    this.route('question', { path: '/question/:qa_id' });
  });
  this.route('register');
  this.route('error', { path: '/*path' });
});
