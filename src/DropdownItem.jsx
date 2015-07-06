var React = require('react');

var DropdownItem = React.createClass({
  propTypes: {
    enabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    type: React.PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      enabled: true,
      type: 'link'
    };
  },

  render: function () {
    var itemClasses;

    itemClasses = ['rs-dropdown-item'];
    if (this.props.className) {
      itemClasses.push(this.props.className);
    }
    if (!this.props.enabled) {
      itemClasses.push('disabled');
    }

    return (
      <li className={itemClasses.join(' ')}>
        {this._innerElement()}
      </li>
    );
  },

  _innerElement: function () {
    var innerElement;

    switch(this.props.type) {
      case 'link':
        innerElement = <a className='rs-dropdown-link'>{this.props.children}</a>;
        break;
      case 'category':
        innerElement = <span className="rs-dropdown-category">{this.props.children}</span>;
        break;
      case 'text':
        innerElement = <span className="rs-dropdown-text">{this.props.children}</span>;
        break;
      default:
        innerElement = <div>{this.props.children}</div>;
    }

    return innerElement;
  },

  _handleClick: function (e) {
    if (this.props.enabled) {
      this.props.onClick(e);
      return e;
    }
    e.preventDefault();
  }
});

module.exports = DropdownItem;
