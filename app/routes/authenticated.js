import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class AuthenticatedRoute extends Route {
  @service session;
  
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return RSVP.hash({
      questions: this.store.findAll('question'),
      users: this.store.findAll('user')
    });
  }
}
