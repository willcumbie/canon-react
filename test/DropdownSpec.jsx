var Dropdown = require('../transpiled/Dropdown');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Dropdown', function () {
  var dropdown;

  beforeEach(function () {
    dropdown = TestUtils.renderIntoDocument(
      <Dropdown className='test-dropdown-class' >Dropdown Text</Dropdown>
    );
  });

  afterEach(function () {
    if (dropdown.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(dropdown).parentNode);
    }
  });

  it('renders a dropdown', function () {
    expect(dropdown.getDOMNode()).toHaveClass('rs-dropdown');
  });

  it('keeps the passed in classes', function () {
    expect(dropdown.getDOMNode()).toHaveClass('test-dropdown-class');
  });

  it('defaults to action type', function () {
    expect(dropdown.props.type).toBe('action');
  });

  it('renders children', function () {
    var menu;

    menu = TestUtils.findRenderedDOMComponentWithClass(dropdown, 'rs-dropdown-menu');

    expect(menu.getDOMNode().textContent).toBe('Dropdown Text');
  });

  describe('dropdown types', function () {
    it('primary', function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <Dropdown type='primary'/>
      );

      expect(dropdownItem.getDOMNode()).toHaveClass('rs-nav-item rs-dropdown rs-primary-dropdown');
    });

    it('utility', function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <Dropdown type='utility'/>
      );

      expect(dropdownItem.getDOMNode()).toHaveClass('rs-nav-item rs-dropdown rs-utility-dropdown');
    });

    it('action', function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <Dropdown type='action'/>
      );

      expect(dropdownItem.getDOMNode()).toHaveClass('rs-dropdown');
    });
  });
});
