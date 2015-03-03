var Tooltip = React.createClass({
  render: function () {
    var classes;

    classes = ['rs-tooltip'];

    if (this.props.visible) {
      classes.push('visible');
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div {...this.props} className={classes.join(' ')}>
        <div className='rs-tooltip-inner'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Tooltip;
