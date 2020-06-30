import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  host = "http://localhost:3000";

  @computed('session.data.authenticated.access_token')
  get headers() {
    let headers = {};
    
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }
}
