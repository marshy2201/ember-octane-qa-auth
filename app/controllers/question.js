import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuestionController extends Controller {
  @tracked answer = null;

  /*
   * Add Answer
   */
  @action
  addAnswer({ model }) {
    model.answers.pushObject({
      text: this.answer,
      createdAt: new Date(),
      updatedAt: new Date,
      votes: 0
    });

    model.save();

    this.answer = null;
  }
}
