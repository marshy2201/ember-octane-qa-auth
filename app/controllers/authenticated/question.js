import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sort } from '@ember/object/computed';

export default class QuestionController extends Controller {
  @tracked answer = null;

  /**
   * Sort answers with highest votes
   */
  @sort('model.answers', function(a, b) {
    if (b.votes > a.votes) {
      return 1;
    } 
    
    return -1;
  }) 
  answers;

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
