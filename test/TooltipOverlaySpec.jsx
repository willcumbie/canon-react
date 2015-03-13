var TooltipOverlay = require('../transpiled/TooltipOverlay');
var Button = require('../transpiled/Button');
var Tooltip = require('../transpiled/Tooltip');
var TestUtils = React.addons.TestUtils;

describe('TooltipOverlay', function () {
  var tooltipOverlay;

  beforeEach(function () {
    tooltipOverlay = TestUtils.renderIntoDocument(
      <TooltipOverlay overlay={<Tooltip>Tooltip text</Tooltip>}>
        <Button>Button Text</Button>
      </TooltipOverlay>
    );
  });

  it('renders the trigger', function () {
    var trigger;

    trigger = TestUtils.findRenderedComponentWithType(tooltipOverlay, Button);

    expect(trigger).not.toBeNull();
  });

  it('renders the tooltip overlay', function () {
    var tooltip;

    tooltip = TestUtils.findRenderedComponentWithType(tooltipOverlay, Tooltip);

    expect(tooltip).not.toBeNull();
  });

  it('shows the tooltip overlay on mouse over of trigger target', function () {
    var trigger, tooltip;

    trigger = TestUtils.findRenderedComponentWithType(tooltipOverlay, Button);
    tooltip = TestUtils.findRenderedComponentWithType(tooltipOverlay, Tooltip);

    TestUtils.SimulateNative.mouseOver(trigger.getDOMNode());

    expect(tooltip.getDOMNode()).toHaveClass('visible');
  });

  it('renders the tooltip overlay to the bottom right of the trigger', function () {
    var trigger, tooltip, expectedTop, expectedLeft;

    trigger = TestUtils.findRenderedComponentWithType(tooltipOverlay, Button);
    tooltip = TestUtils.findRenderedComponentWithType(tooltipOverlay, Tooltip);

    TestUtils.SimulateNative.mouseOver(trigger.getDOMNode());

    expectedTop = trigger.getDOMNode().offsetTop + trigger.getDOMNode().clientHeight + 'px';
    expectedLeft = trigger.getDOMNode().offsetLeft + trigger.getDOMNode().clientWidth + 'px';
    expect(tooltip.getDOMNode().style.top).toBe(expectedTop);
    expect(tooltip.getDOMNode().style.left).toBe(expectedLeft);
  });
});
