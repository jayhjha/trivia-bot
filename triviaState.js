/* eslint-disable no-underscore-dangle */
class TriviaState {
  constructor(isActive, answer) {
    this._isActive = isActive;
    this._answer = answer;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(isActive) {
    this._isActive = isActive;
  }

  get answer() {
    return this._answer;
  }

  set answer(answer) {
    this._answer = answer;
  }
}

const triviaState = new TriviaState(false);

module.exports = triviaState;
