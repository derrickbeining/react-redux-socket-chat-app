import {createStore} from 'redux'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const RECEIVE_POSTED_MESSAGE = 'RECEIVE_POSTED_MESSAGE';
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const initialState = {
    newMessageContent: '',
    messages: []
};

export function gotMessagesFromServer (messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  };
}

export function writeMessage (content) {
    return {
        type: WRITE_MESSAGE,
        newMessageContent: content
    };
}

export function receivePostedMessage (message) {
    return {
        type: RECEIVE_POSTED_MESSAGE,
        message : message
    };
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {messages: action.messages});
    case WRITE_MESSAGE:
        return Object.assign({}, state, {newMessageContent: action.newMessageContent});
    case RECEIVE_POSTED_MESSAGE:
        return Object.assign({}, state, {messages: state.messages.concat(action.message)});
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;

