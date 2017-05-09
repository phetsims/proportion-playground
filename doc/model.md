# Proportion Playground - model description

# Necklace scenes

Uses the GCD of the round/square bead counts to determine how many repetitions there will be, i.e.:

1. (squareCount/gcd) square beads,
2. (roundCount/gcd) round beads,
3. Repeat steps 1,2 until there are (gcd) copies.

# Paint scenes

The weighted geometric mean of the two paint colors is used, to try to reproduce normal paint mixing
(see http://www.handprint.com/HP/WCL/color3.html#mixprofile). The differences are somewhat exaggerated with a power function, which stretches the range where one paint is dominant, to allow better contrast.

The area of the balloons and drips should be the same as the area of a single-balloon splotch.

# Billiards scenes

The ball stops when it hits any corner. Speed is slightly re-scaled depending on the width/height.

To figure out the total length, it's easier to think of a ball traveling across a grid, where it stops if it hits horizontal/vertical grid lines at the same time. It's equivalent to traveling across a `(width/gcd)`x`(height/gcd)` rectangle from one corner to another. The number of "bounces" off of the walls (including the start and end points) will be `(width+height)/gcd`, and it will cover a total distance of `width*length*sqrt(2)/gcd^2`.

# Apple scenes

It's division.
