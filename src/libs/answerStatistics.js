import maxKey from 'utils/maxKey';
import isEmpty from 'lodash/lang/isEmpty';

function answerStatistics(packet, keys, prop, state = {}) {
  const innerTree = {
    mostCommon: undefined,
    answerFreqs: { A: 0, B: 0,  C: 0, D: 0 }
  };

  // If no state object is passed, loop through the keys and set each
  // one to innerTree.
  isEmpty(state) ? keys.forEach(key => state[key] = innerTree) : 0;

  // Return a clone of the previous state, but set the answer frequency
  // for the answer the user chose, in their house, to itself + 1.
  const newState = Object.assign({}, state, {
    [packet[prop]]: Object.assign({}, state[packet[prop]], {
      answerFreqs: Object.assign({}, state[packet[prop]].answerFreqs, {
        [packet.answer]: state[packet[prop]].answerFreqs[packet.answer] + 1
      })
    })
  });

  // Set the mostCommon property for the packet's house to freq max.
  newState[packet[prop]].mostCommon = maxKey(newState[packet[prop]].answerFreqs);

  return newState;
}

export default answerStatistics;
