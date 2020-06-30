import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;
  @tracked errorMessage;

  /**
   * Authenticate login
   */
  @action
  async authenticate() {
    const { email, password } = this;

    try {
      await this.session.authenticate('authenticator:oauth2', email, password);
    } catch (error) {
      this.errorMessage = "Incorrect email or password";
    }

    if (this.session.isAuthenticated) {
      this.transitionToRoute('authenticated');
    }
  }
}
