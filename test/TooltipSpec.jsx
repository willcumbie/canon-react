var Tooltip = require('../transpiled/Tooltip');
var TestUtils = React.addons.TestUtils;

describe('Tooltip', function () {
  var tooltip;

  beforeEach(function () {
    tooltip = TestUtils.renderIntoDocument(
      <Tooltip className='test-class'>some text</Tooltip>
    );
  });

  it('has the rs-tooltip class', function () {
    expect(tooltip.getDOMNode()).toHaveClass('rs-tooltip');
  });

  it('copies passed in class names', function () {
    expect(tooltip.getDOMNode()).toHaveClass('test-class');
  });

  it('renders children', function () {
    var tooltipContent;

    tooltipContent = TestUtils.findRenderedDOMComponentWithClass(tooltip, 'rs-tooltip-inner');

    expect(tooltipContent.getDOMNode().textContent).toBe('some text');
  });
});
