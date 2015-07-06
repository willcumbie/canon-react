var React = require('react');

var Dropdown = React.createClass({

  propTypes: {
    type: React.PropTypes.oneOf(['primary', 'utility', 'action'])
  },

  getDefaultProps: function () {
    return {
      type: 'action'
    };
  },

  _classes: function () {
    var classes, menuTypes;

    menuTypes = {
      'primary': 'rs-nav-item rs-dropdown rs-primary-dropdown',
      'utility': 'rs-nav-item rs-dropdown rs-utility-dropdown',
      'action': 'rs-dropdown',
    };

    classes = [];
    classes.push(this.props.className);

    if (this.props.type && menuTypes[this.props.type]) {
      classes.push(menuTypes[this.props.type]);
    }

    return classes.join(' ');
  },

  render: function () {
    var style;

    style = {float: 'left'};
    return (
      <div className={this._classes()} style={style}>
        <ul className='rs-dropdown-menu visible'>
          {this.props.children}
        </ul>
      </div>
    );
  }
});

module.exports = Dropdown;
