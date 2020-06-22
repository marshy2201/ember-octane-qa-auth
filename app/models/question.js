import Model, { attr } from '@ember-data/model';

export default class QuestionModel extends Model {
  @attr('string') text;
  @attr('date', { 
    defaultValue() {
      return new Date();
    }
  }) createdAt;
  @attr answers;
}
