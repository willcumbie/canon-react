var TooltipOverlay = React.createClass({

  getInitialState: function () {
    return {
      overlayShown: false,
      overlayLeft: null,
      overlayTop: null
    };
  },

  updateOverlayPosition: function () {
    var overlayTop, overlayLeft, documentElement, box;

    box = { top: 0, left: 0 };
    if ( typeof this.getDOMNode().getBoundingClientRect !== 'undefined' ) {
      box = this.getDOMNode().getBoundingClientRect();
    }
    box = this.getDOMNode().getBoundingClientRect();

    documentElement = document.documentElement;
    overlayTop = box.top + window.pageYOffset - documentElement.clientTop;
    overlayLeft = box.left + window.pageXOffset - documentElement.clientLeft;
    
    this.setState({
      overlayLeft: overlayLeft,
      overlayTop: overlayTop
    });
  },

  render: function () {
    var children, hoverProps, overlay, overlayProps;

    hoverProps = {
      'onMouseOver': function () {
        this.setState({overlayShown: true}, function () {
          this.updateOverlayPosition();
        });
      }.bind(this)
    };

    overlayProps = {
      visible: this.state.overlayShown,
      style: {
        top: this.state.overlayTop,
        left: this.state.overlayLeft
      }
    };

    children = React.addons.cloneWithProps(this.props.children, hoverProps);
    overlay = React.addons.cloneWithProps(this.props.overlay, overlayProps);
    return (
      <div {...this.props}>{children}{overlay}</div>
    );
  }
});

module.exports = TooltipOverlay;
