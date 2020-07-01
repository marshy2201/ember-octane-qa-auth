import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class QuestionController extends Controller {
  @service currentUser;

  @tracked answer = null;

  /**
   * Sort answers with highest votes
   */
  @sort('model.question.answers', function(a, b) {
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
    model.question.answers.pushObject({
      text: this.answer,
      createdAt: new Date(),
      updatedAt: new Date,
      votes: 0,
      addedBy: this.currentUser.user.id
    });

    model.question.save();

    this.answer = null;
  }
}
