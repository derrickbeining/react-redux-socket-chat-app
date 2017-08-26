import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

// ACTION TYPES //////////////////////////////////////////
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const RECEIVE_POSTED_MESSAGE = 'RECEIVE_POSTED_MESSAGE';
const SET_USERNAME = 'SET_USERNAME';
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const WRITE_USERNAME = 'WRITE_USERNAME'

// INITIAL STATE ////////////////////////////////////////
const initialState = {
  newMessageContent: '',
  messages: [],
  username: '',
  usernameInput: ''
};

// THUNKS /////////////////////////////////////////////
export function fetchMessages () {
  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => dispatch(gotMessagesFromServer(messages)));
  };
}

export function postMessage (message) {
  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(postedMessage => {
        dispatch(writeMessage(''));
        dispatch(receivePostedMessage(postedMessage))
        socket.emit('new-message', postedMessage);
      })
      .catch(err => {
        console.error(err);
      });
  };
}

// ACTION CREATORS //////////////////////////////////
export function gotMessagesFromServer (messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  };
}

export function receivePostedMessage (message) {
  return {
    type: RECEIVE_POSTED_MESSAGE,
    message
  };
}

export function setUsername (username) {
  return {
    type: SET_USERNAME,
    username
  }
}

export function writeMessage (content) {
  return {
    type: WRITE_MESSAGE,
    newMessageContent: content
  };
}

export function writeUsername (usernameInput) {
  return {
    type: WRITE_USERNAME,
    usernameInput
  };
}

// THE REDUCER //////////////////////////////////////
function reducer (state = initialState, action) {
  switch (action.type) {

    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign(
        {},
        state,
        {messages: action.messages}
      );

    case RECEIVE_POSTED_MESSAGE:
      return Object.assign(
        {},
        state,
        {messages: state.messages.concat(action.message)}
      );

    case SET_USERNAME:
      return Object.assign(
        {},
        state,
        {username: action.username}
      )

    case WRITE_MESSAGE:
      return Object.assign(
        {},
        state,
        {newMessageContent: action.newMessageContent}
      );

    case WRITE_USERNAME:
      return Object.assign(
        {},
        state,
        {usernameInput: action.usernameInput}
      );

    default:
      return state;
  }
}


// STORE AND MIDDLEWARE ///////////////////////////////////
const enhancements = applyMiddleware(logger, thunkMiddleware);
const store = createStore(reducer, enhancements);
export default store;

