/* eslint-disable no-underscore-dangle */
class TriviaState {
  constructor(isActive, activeTriviaSet, current) {
    this._isActive = isActive;
    this._activeTriviaSet = activeTriviaSet;
    this._current = current;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(isActive) {
    this._isActive = isActive;
  }

  get activeTriviaSet() {
    return this._activeTriviaSet;
  }

  set activeTriviaSet(activeTriviaSet) {
    this._activeTriviaSet = activeTriviaSet;
  }

  get current() {
    return this._current;
  }

  set current(current) {
    this._current = current;
  }
}

const triviaState = new TriviaState(false, [], -1);

module.exports = triviaState;
