import React, {Component} from 'react';
import axios from 'axios';
import store, {writeMessage, receivePostedMessage} from '../store';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor(props) {
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (event) {
    store.dispatch(writeMessage(event.target.value))
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const content = this.state.newMessageContent;
    const channelId = this.props.channelId;
    axios.post('/api/messages', {content, channelId})
      .then(res => res.data)
      .then(message => {
        store.dispatch(writeMessage(''));
        store.dispatch(receivePostedMessage(message))
        socket.emit('new-message', message);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageContent}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
