var React = require('react');

var ButtonGroup = React.createClass({
  render: function () {
    var classes;

    classes = [];
    classes.push(this.props.className);
    classes.push('rs-btn-group');

    return (
      <div {...this.props} className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ButtonGroup;
