import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentUserService extends Service {
  @service session;
  @service store;

  @tracked user = null;

  async load() {
    const userId = this.session.data.authenticated.userId;
    
    if (this.session.isAuthenticated) {
      const user = await this.store.findRecord('user', userId);

      this.user = user;
    }
  }
}
