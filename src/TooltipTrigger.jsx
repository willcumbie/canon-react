var TooltipTrigger = React.createClass({

  getInitialState: function () {
    return {
      overlayShown: false,
      overlayLeft: null,
      overlayTop: null
    };
  },

  updateOverlayPosition: function () {
    var overlayTop, overlayLeft, documentElement, box;

    documentElement = document.documentElement;
    box = this.getDOMNode().getBoundingClientRect();

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
      <div>{children}{overlay}</div>
    );
  }
});

module.exports = TooltipTrigger;
