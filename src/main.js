import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import ProseMirror from "./prosemirror-react-component";

var {number, string} = PropTypes;
const style = {
  border: '8px solid pink',
  minHeight: '200px'
};

class Hello extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }
  componentWillMount() {
    this.setState({doc: undefined, selection: undefined});
  }

  onChange(doc, selection) {
    console.log('onChange: ', doc, selection);
    this.setState({doc, selection})
  }

  render() {
    const {doc, selection} = this.state;
    var prettifiedDoc = undefined;
    try {
      prettifiedDoc = JSON.stringify(doc, null, 4).split('\n')
        .map(string=>("    " + string)).join('\n').slice(4);
    } catch (e) {
      console.log(e);
    }
    return (
      <div>
        <ProseMirror style={style} onChange={this.onChange} doc={doc} selection={selection}/>
      </div>
    );
  }
}
ReactDOM.render(<Hello />, document.getElementById('editor'))