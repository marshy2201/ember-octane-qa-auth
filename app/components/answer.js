import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AnswerComponent extends Component {
  @service currentUser;
  
  @tracked edit = false;

  get haveVoted() {
    const haveVoted = this.args.answer.usersVoted.findBy('user', this.currentUser.user.id);
    
    return haveVoted;
  }

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
    const { id } = this.currentUser.user;

    const alreadyVoted = answer.usersVoted.findBy('user', id);
    let previousVote = null;

    if (alreadyVoted) {
      previousVote = alreadyVoted.voted;
    }

    // check if vote sent is different from previous vote
    if (previousVote !== vote) {
      let voted;

      if (vote === "up") {
        set(answer, "votes", answer.votes + 1);
        voted = 'up';
      } else {
        set(answer, "votes", answer.votes - 1);
        voted = 'down';
      }

      // remove previous vote from array
      if (previousVote) {
        answer.usersVoted.removeObject(alreadyVoted);
      } else {
        // add new vote
        answer.usersVoted.pushObject({ user: id, voted });
      }

      model.question.save();
    }
  }
}