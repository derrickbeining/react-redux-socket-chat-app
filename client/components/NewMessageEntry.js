import React, {Component} from 'react';
import store, {writeMessage, receivePostedMessage, postMessage} from '../store';
import socket from '../socket';
import AlertNotification from './AlertNotification';

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

  handleSubmit (event) {
    event.preventDefault()
    const message = {
      name: this.state.username,
      content: this.state.newMessageContent,
      channelId: this.props.channelId
    }
    store.dispatch(postMessage(message));
  }

  render () {
    const alertMessage = 'Please set a username before posting a message';
    const alertShouldDisplay = this.state.username.length <= 0;
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className={`form-control ${!this.state.username && '.bg-warning'}`}
            type="text"
            name="content"
            placeholder="Chat it up!"
            value={this.state.newMessageContent}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
        <AlertNotification
          message={alertMessage}
          shouldDisplay={alertShouldDisplay}
        />
      </form>
    );
  }
}
