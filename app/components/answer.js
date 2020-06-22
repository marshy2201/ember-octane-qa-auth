import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AnswerComponent extends Component {
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

      await model.save();

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

    model.answers.removeObject(answer);

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

    model.save();
  }
}