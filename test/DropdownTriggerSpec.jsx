var DropdownTrigger = require('../transpiled/DropdownTrigger');

var Button = require('../transpiled/Button');
var Dropdown = require('../transpiled/Dropdown');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('DropdownTrigger', function () {
  var dropdownTrigger, tether;

  function renderDropdown() {
    dropdownTrigger = TestUtils.renderIntoDocument(
      <DropdownTrigger dropdown={<Dropdown><Button onClick={function(){}}>Hello</Button>Content</Dropdown>}>
        <Button>Hello</Button>
      </DropdownTrigger>
    );

    tether = jasmine.createSpyObj('tether', ['destroy']);
    spyOn(dropdownTrigger, '_createTether').andReturn(tether);
  }

  afterEach(function () {
    if (dropdownTrigger.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(dropdownTrigger).parentNode);
    }
  });

  it('renders the passed in trigger', function () {
    var button;

    renderDropdown();

    button = TestUtils.findRenderedComponentWithType(dropdownTrigger, Button);

    expect(button.getDOMNode().textContent).toBe('Hello');
  });

  it('does not display the dropdown initially', function () {
    renderDropdown();

    expect(dropdownTrigger._dropdownNode).toBeUndefined();
  });

  describe('trigger click', function () {
    var button;

    function clickTrigger () {
      button = TestUtils.findRenderedComponentWithType(dropdownTrigger, Button);
      TestUtils.Simulate.click(button.getDOMNode());
    }

    it('renders the dropdown', function () {
      var dropdownContainer;

      renderDropdown();
      clickTrigger();

      dropdownContainer = document.querySelector('.dropdown-container');

      expect(dropdownContainer).not.toBeNull();
      expect(dropdownTrigger._dropdownNode).not.toBeNull();
    });

    it('renders the dropdown to the bottom of the trigger', function () {
      renderDropdown();
      clickTrigger();

      expect(dropdownTrigger._createTether).toHaveBeenCalledWith({
        element: React.findDOMNode(dropdownTrigger._containerDiv),
        target: React.findDOMNode(dropdownTrigger.getDOMNode()),
        attachment: 'top left',
        targetAttachment: 'bottom left',
      });
    });

    it('hides the dropdown when the trigger is clicked again', function() {
      renderDropdown();
      clickTrigger();

      TestUtils.Simulate.click(button.getDOMNode());

      expect(tether.destroy).toHaveBeenCalled();
      expect(dropdownTrigger._dropdownNode).toBeNull();
    });

    it('hides the dropdown when pressing escape', function() {
      var keyUpEvent;

      renderDropdown('right');
      clickTrigger();

      keyUpEvent = document.createEvent('CustomEvent');
      keyUpEvent.initEvent('keyup', true, true);
      keyUpEvent.keyCode = 27;
      document.dispatchEvent(keyUpEvent);

      expect(tether.destroy).toHaveBeenCalled();
      expect(dropdownTrigger._dropdownNode).toBeNull();
    });

    it('hides the dropdown when clicking outside of the dropdown', function() {
      renderDropdown('right');
      clickTrigger();

      TestUtils.Simulate.click(React.findDOMNode(dropdownTrigger));

      expect(tether.destroy).toHaveBeenCalled();
      expect(dropdownTrigger._dropdownNode).toBeNull();
    });

    it('does not hide the dropdown when clicking inside of the dropdown', function() {
      var dropdownButton;

      renderDropdown('right');
      clickTrigger();

      dropdownButton = TestUtils.findRenderedComponentWithType(dropdownTrigger._dropdownNode, Button);
      TestUtils.Simulate.click(React.findDOMNode(dropdownButton));

      expect(tether.destroy).not.toHaveBeenCalled();
      expect(dropdownTrigger._dropdownNode).not.toBeNull();
    });

    it('cleans up when the component is unmounted', function () {
      renderDropdown('right');
      clickTrigger();

      React.unmountComponentAtNode(React.findDOMNode(dropdownTrigger).parentNode);

      expect(tether.destroy).toHaveBeenCalled();
      expect(dropdownTrigger._tether).toBeNull();
      expect(dropdownTrigger._dropdownNode).toBeNull();
      expect(document.body.getElementsByClassName('dropdown-container').length).toEqual(0);
    });
  });
});
