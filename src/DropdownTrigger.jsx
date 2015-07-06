var React = require('react');
var Tether = require('tether');

var DropdownTrigger = React.createClass({

  propTypes: {
    dropdown: React.PropTypes.element
  },

  getInitialState: function () {
    return {
      isDropdownDisplayed: false
    };
  },

  componentWillUnmount: function () {
    this._unrenderDropdown();
    document.body.removeChild(this._containerDiv);
  },

  componentDidMount: function () {
    this._containerDiv = document.createElement('div');
    this._containerDiv.className = 'dropdown-container';
    document.body.appendChild(this._containerDiv);
  },

  render: function () {
    var props;

    props = {};
    props.onClick = this._onTriggerClick;

    return (
      React.cloneElement(
        React.Children.only(this.props.children),
        props
      )
    );
  },

  _onTriggerClick: function () {
    if (this.state.isDropdownDisplayed) {
      this._hide();
    } else {
      this._show();
    }
  },

  _hide: function () {
    this._unrenderDropdown();
    this.setState({ isDropdownDisplayed: false });
  },

  _unrenderDropdown: function () {
    this._removeDocumentListeners();
    if (this._tether) {
      this._tether.destroy();
      this._tether = null;
    }
    if (this._dropdownNode) {
      React.unmountComponentAtNode(this._containerDiv);
      this._dropdownNode = null;
    }
  },

  _removeDocumentListeners: function () {
    document.removeEventListener('click', this._handleDocumentClick, false);
    document.removeEventListener('keyup', this._handleEscapePress, false);
  },

  _show: function () {
    this._renderDropdown();
    this._listenToRootCloseEvents();
    this.setState({ isDropdownDisplayed: true });
  },

  _renderDropdown: function () {
    var dropdown;

    dropdown = React.cloneElement(
      this.props.dropdown,
      {
        hideCallback: this._hide
      }
    );

    this._dropdownNode = React.render(dropdown, this._containerDiv);
    this._tether = this._createTether(this._getTetherConfig());
  },

  // This is a seam for testing
  _createTether: function (tetherConfig) {
    return new Tether(tetherConfig);
  },

  _getTetherConfig: function () {
    var tetherConfig;

    tetherConfig = {
      attachment: 'top left',
      targetAttachment: 'bottom left',
    }

    tetherConfig.element = React.findDOMNode(this._containerDiv);
    tetherConfig.target = React.findDOMNode(this);

    return tetherConfig;
  },

  _listenToRootCloseEvents: function () {
    this._listenToClicksOutsideOfDropdown();
    this._listenToEscape();
  },

  _listenToClicksOutsideOfDropdown: function () {
    document.addEventListener('click', this._handleDocumentClick, false);
  },

  _handleDocumentClick: function (e) {
    if (React.findDOMNode(this._dropdownNode).contains(e.target)) {
      return;
    }
    this._hide();
  },

  _listenToEscape: function () {
    document.addEventListener('keyup', this._handleEscapePress, false);
  },

  _handleEscapePress: function (e) {
    if (e.keyCode === 27) {
      this._hide();
    }
  }
});

module.exports = DropdownTrigger;
