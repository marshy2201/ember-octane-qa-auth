import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;
  @attr lastName;
  @attr email;
  @attr password;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
