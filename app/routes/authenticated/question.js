import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class QuestionRoute extends Route {
  model(params) {
    return RSVP.hash({
      question: this.store.findRecord('question', params.qa_id),
      users: this.modelFor('authenticated').users
    });
  }
}
