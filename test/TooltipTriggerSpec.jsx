var TooltipTrigger = require('../transpiled/TooltipTrigger');
var Button = require('../transpiled/Button');
var Tooltip = require('../transpiled/Tooltip');
var TestUtils = React.addons.TestUtils;

describe('TooltipTrigger', function () {
  var tooltipTrigger;

  beforeEach(function () {
    tooltipTrigger = TestUtils.renderIntoDocument(
      <TooltipTrigger overlay={<Tooltip>Tooltip text</Tooltip>}><Button>Button Text</Button></TooltipTrigger>
    );
  });

  it('renders the trigger', function () {
    var trigger;

    trigger = TestUtils.findRenderedComponentWithType(tooltipTrigger, Button);

    expect(trigger).not.toBeNull();
  });

  it('renders the tooltip overlay', function () {
    var tooltipOverlay;

    tooltipOverlay = TestUtils.findRenderedComponentWithType(tooltipTrigger, Tooltip);

    expect(tooltipOverlay).not.toBeNull();
  });

  it('shows the tooltip overlay on mouse over of trigger target', function () {
    var trigger, tooltipOverlay;

    trigger = TestUtils.findRenderedComponentWithType(tooltipTrigger, Button);
    tooltipOverlay = TestUtils.findRenderedComponentWithType(tooltipTrigger, Tooltip);

    TestUtils.SimulateNative.mouseOver(trigger.getDOMNode());

    expect(tooltipOverlay.getDOMNode()).toHaveClass('visible');
  });

  it('renders the tooltip overlay next to the trigger element', function () {
    var trigger, tooltipOverlay;

    trigger = TestUtils.findRenderedComponentWithType(tooltipTrigger, Button);
    tooltipOverlay = TestUtils.findRenderedComponentWithType(tooltipTrigger, Tooltip);

    TestUtils.SimulateNative.mouseOver(trigger.getDOMNode());

    expect(tooltipOverlay.getDOMNode().style.top).toBe('0px');
    expect(tooltipOverlay.getDOMNode().style.left).toBe('0px');
  });
});
