var DropdownItem = require('../transpiled/DropdownItem');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('DropdownItem', function () {
  var clickFunction, dropdownItem;

  beforeEach(function () {
    clickFunction = jasmine.createSpy('clickFunction');

    dropdownItem = TestUtils.renderIntoDocument(
      <DropdownItem id='dropdown-id' className='test-dropdown-class' onClick={clickFunction}>Dropdown Text</DropdownItem>
    );
  });

  afterEach(function () {
    if (dropdownItem.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(dropdownItem).parentNode);
    }
  });

  it('renders a dropdownItem', function () {
    expect(TestUtils.findRenderedDOMComponentWithTag(dropdownItem, 'li')).not.toBeNull();
  });

  it('keeps the passed in classes', function () {
    expect(dropdownItem.getDOMNode()).toHaveClass('test-dropdown-class');
    expect(dropdownItem.getDOMNode()).toHaveClass('rs-dropdown-item');
  });

  it('is enabled by default', function () {
    expect(dropdownItem.props.enabled).toBe(true);
    expect(dropdownItem.getDOMNode()).not.toHaveClass('disabled');
  });

  it('is a link by default', function () {
    expect(dropdownItem.props.type).toBe('link');
  });

  it('keeps all passed in properties', function () {
    expect(dropdownItem.getDOMNode().id).toBe('dropdown-id');
  });

  it('renders the text of the dropdown', function () {
    expect(dropdownItem.getDOMNode().textContent).toBe('Dropdown Text');
  });

  it('executes the click function when clicked', function () {
    TestUtils.Simulate.click(dropdownItem.getDOMNode());

    expect(clickFunction).toHaveBeenCalled();
  });

  describe('dropdown types', function () {
    it('link', function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <DropdownItem type='link'/>
      );

      expect(TestUtils.findRenderedDOMComponentWithTag(dropdownItem, 'a').getDOMNode()).toHaveClass('rs-dropdown-link');
    });

    it('category', function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <DropdownItem type='category'/>
      );

      expect(TestUtils.findRenderedDOMComponentWithTag(dropdownItem, 'span').getDOMNode()).toHaveClass('rs-dropdown-category');
    });

    it('text', function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <DropdownItem type='text'/>
      );

      expect(TestUtils.findRenderedDOMComponentWithTag(dropdownItem, 'span').getDOMNode()).toHaveClass('rs-dropdown-text');
    });
  });

  describe('when disabled', function () {
    beforeEach(function () {
      dropdownItem = TestUtils.renderIntoDocument(
        <DropdownItem enabled={false} onClick={clickFunction}>DropdownItem text</DropdownItem>
      );
    });

    it('adds a disabled class to the dropdownItem', function () {
      expect(dropdownItem.getDOMNode()).toHaveClass('disabled');
    });

    it('does not execute the click function when clicked', function () {
      TestUtils.Simulate.click(dropdownItem.getDOMNode());

      expect(clickFunction).not.toHaveBeenCalled();
    });
  });
});
