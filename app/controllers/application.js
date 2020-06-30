import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service session;
  @service currentUser;

  /**
   * Logout user of session
   */
  @action
  logout() {
    this.session.invalidate();
  }
}
