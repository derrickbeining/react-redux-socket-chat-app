import React from 'react';
import store, {writeUsername, setUsername} from '../store';

export default class NameEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe =
      store.subscribe(() => {this.setState(store.getState())});
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (event) {
    store.dispatch(writeUsername(event.target.value))
  }

  handleSubmit (event) {
    event.preventDefault();
    store.dispatch(setUsername(this.state.usernameInput))

  }

  render () {
    return (
      <form
        id="username-input"
        className="form-inline"
        onSubmit={(event) => this.handleSubmit(event)}
      >
        {/* <label htmlFor="name">Enter your&nbsp; </label>
        <input
          type="text"
          name="name"
          placeholder="username"
          className="form-control"
          value={this.state.usernameInput}
          onChange={(event) => this.handleChange(event)}
        /> */}

        <div className="col-xl-6">
          <div className="input-group">
            {/* <label htmlFor="name">Enter your&nbsp; </label> */}
            <span className="input-group-addon">@</span>
            <input
              type="text"
              name="name"
              placeholder="username"
              className="form-control"
              value={this.state.usernameInput}
              onChange={(event) => this.handleChange(event)}
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="submit">Save</button>
            </span>
          </div>
        </div>
      </form>
    )
  }
}

