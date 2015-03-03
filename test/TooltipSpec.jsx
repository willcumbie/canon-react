var Tooltip = require('../transpiled/Tooltip');
var TestUtils = React.addons.TestUtils;

describe('Tooltip', function () {
  var tooltip;

  beforeEach(function () {
    tooltip = TestUtils.renderIntoDocument(
      <Tooltip>some text</Tooltip>
    );
  });

  it('has the rs-tooltip class', function () {
    expect(tooltip.getDOMNode()).toHaveClass('rs-tooltip');
  });

  it('renders children', function () {
    var tooltipContent;

    tooltipContent = TestUtils.findRenderedDOMComponentWithClass(tooltip, 'rs-tooltip-inner');

    expect(tooltipContent.getDOMNode().textContent).toBe('some text');
  });
});
