
The explore and predict screens are very similar, so they use mainly the same components. A 'predictMode' ({boolean})
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
    SceneRatioControl (left and right, contains controls like pickers)
      SceneRatioNode (view for the ratio)
