var React = require('react');

var Popover = React.createClass({

  propTypes: {
    placement: React.PropTypes.oneOf(['right', 'bottom-right', 'left', 'bottom-left'])
  },

  getDefaultProps: function () {
    return {
      placement: 'right'
    };
  },

  _arrowPlacement: function () {
    var arrowClasses, arrowPositions;

    arrowPositions = {
      'right': 'rs-popover-arrow-left-top',
      'bottom-right': 'rs-popover-arrow-top-left',
      'left': 'rs-popover-arrow-right-top',
      'bottom-left': 'rs-popover-arrow-top-right'
    };
    arrowClasses = ['rs-popover-arrow'];

    arrowClasses.push(arrowPositions[this.props.placement]);

    return arrowClasses.join(' ');
  },

  render: function () {
    var popoverClasses;

    popoverClasses = ['rs-popover'];
    if (this.props.className) {
      popoverClasses.push(this.props.className);
    }

    return (
      <div className={popoverClasses.join(' ')}>
        <div className={this._arrowPlacement()}></div>
        <div className='rs-popover-content'>
            {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Popover;
