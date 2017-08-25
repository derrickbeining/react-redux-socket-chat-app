import React, {Component} from 'react';
import store, {writeName} from '../store';


export default class NewMessageEntry extends Component {
    constructor(props) {
        super();
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleChange (event) {
        store.dispatch(writeName(event.target.value))
    }

    render () {

   return(
        <form className="form-inline">
            <label htmlFor="name">Your name:</label>
            <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                className="form-control"
            />
        </form>
    );
}
}
