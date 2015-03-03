var Tooltip = React.createClass({
  render: function () {
    return (
      <div className='rs-tooltip'>
        <div className='rs-tooltip-inner'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Tooltip;
