import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service currentUser;
  
  @tracked question = null;

  /**
   * Sort questions by date created at
   */
  @sort('model', function(a, b) {
    if (b.createdAt > a.createdAt) {
      return 1;
    } 
    
    return -1;
  }) 
  questions;

  /**
   * Add a Question
   */
  @action 
  addQuestion() {
    const newQuestion = this.store.createRecord('question', { text: this.question });
    
    newQuestion.save();

    this.question = null;
  }

  /**
   * Remove a Question
   */
  @action
  removeQuestion(question) {
    question.destroyRecord();
  }
}
