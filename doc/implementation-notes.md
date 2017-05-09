# Proportion Playground - implementation notes

The Explore and Predict screens are very similar, so they use mainly the same components. A 'predictMode' ({boolean})
flag is passed to components that need to vary between the screens.

Both screens have four 'scenes':
  'necklace'
  'paint'
  'billiards'
  'apples'
such that each scene has two ratios (left and right), where the right ratio is only visible if showBoth is checked.
The SceneRatio types are AppleGroup, BilliardsTable, Necklace and Splotch.

The view is composed at a high level as:
ProportionScreenView
  SceneNodes (one for each scene)
    SceneRatioControls (left and right, contains controls like pickers)
      SceneRatioNode (view for the ratio)

Almost all model and view objects are created on startup and are persistent (and don't need to remove listeners), except for the following potential cases:

- NecklaceLayout's layouts are lazily created (responsible for creating the beads also), but are retained.
- PaintBalloon and PaintDrip in the model are transient, but references should be cleaned up.
- RoundBeadNodes/SquareBeadNodes are lazily created and reused by NecklaceGraphicNode (up to the maximum number of beads in a necklace for each necklace).
- PaintBalloonNode and PaintDripNode in the view are transient, and get disposed when not used.
