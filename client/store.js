import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const RECEIVE_POSTED_MESSAGE = 'RECEIVE_POSTED_MESSAGE';
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const initialState = {
  newMessageContent: '',
  messages: []
};

export function fetchMessages (  ) {
    return function thunk(dispatch) {
       return axios.get('/api/messages')
            .then(res => res.data)
            .then(messages => dispatch(gotMessagesFromServer(messages)));
    };
}

export function postMessage (content,channelId  ) {
    return function thunk(dispatch) {
        return  axios.post('/api/messages', {content, channelId})
            .then(res => res.data)
            .then(message => {
                dispatch(writeMessage(''));
                dispatch(receivePostedMessage(message))
                socket.emit('new-message', message);
            })
            .catch(err => {
                console.error(err);
            });
    };
}

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
    message: message
  };
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {messages: action.messages});
    case WRITE_MESSAGE:
      return Object.assign({}, state, {newMessageContent: action.newMessageContent});
    case RECEIVE_POSTED_MESSAGE:
      return Object.assign(
        {},
        state,
        {messages: state.messages.concat(action.message)});
    default:
      return state;
  }
}

const enhancements = applyMiddleware(logger, thunkMiddleware);
const store = createStore(reducer, enhancements);
export default store;

