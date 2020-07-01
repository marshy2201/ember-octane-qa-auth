import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AnswerComponent extends Component {
  @service currentUser;
  
  @tracked edit = false;

  /**
   * Edit Answer
   */
  @action 
  async editAnswer() {
    if (this.edit) {
      const { model, answer } = this.args;

      // update updated date
      set(answer, 'updatedAt', new Date());

      await model.question.save();

      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  /**
   * Remove answer
   */
  @action
  removeAnswer() {
    const { model, answer } = this.args;

    model.question.answers.removeObject(answer);

    model.save();
  }

  /**
   * Vote
   */
  @action
  vote(vote) {
    const { model, answer } = this.args;

    if (vote === "up") {
      set(answer, "votes", answer.votes + 1);
    } else {
      set(answer, "votes", answer.votes - 1);
    }

    model.question.save();
  }
}