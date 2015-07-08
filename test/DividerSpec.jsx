var Divider = require('../transpiled/Divider');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Divider', function () {
  var divider;

  beforeEach(function () {
    divider = TestUtils.renderIntoDocument(
      <Divider/>
    );
  });

  afterEach(function () {
    if (divider.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(divider).parentNode);
    }
  });

  it('renders a divider', function () {
    expect(TestUtils.findRenderedDOMComponentWithTag(divider, 'li')).not.toBeNull();
  });

  it('has the correct class', function () {
    expect(divider.getDOMNode()).toHaveClass('rs-divider');
  });
});
