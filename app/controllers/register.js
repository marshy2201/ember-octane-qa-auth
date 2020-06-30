import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service session;
  @tracked errorMessage;

  /**
   * Register user
   */
  @action
  async register() {
    if (this.password === this.retypePassword) {
      // create new user
      const user = this.store.createRecord('user', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      });

      await user.save();

      await this.session.authenticate('authenticator:oauth2', this.email, this.password);
      this.transitionToRoute('authenticated');
    } else {
      this.errorMessage = "Passwords don't match";
    }
  }
}
