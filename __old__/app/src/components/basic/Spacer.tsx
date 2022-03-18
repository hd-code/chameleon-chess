import React from 'react';
import { View } from 'react-native';

import { getBaseFontSize } from '../../helper';

// -----------------------------------------------------------------------------

interface SpacerProps {
    /** Scale height and width of the `Spacer` relative to the font size. */
    scale?: number;
    /** Set absolute values for height and width of the `Spacer`. This setting
     * precedes the `scale` property if both are set. */
    size?: number;
}

/** This basic component just takes up a little bit of space. It can be used to
 * separate other components from each other visually. This is usually easier to
 * handle than margins, especially on different screen sizes and orientations.
 * It can be used to create space vertically as well as horizontally.
 * 
 * The default size is equivalent to the font size and can be altered through
 * the `scale` (relative to font size) or the `size` (absolute pixel values)
 * properties. `size` takes precedence over `scale` if both are provided. */
const Spacer = ({scale, size}: SpacerProps) => {
    const dim = size ? size : getBaseFontSize() * (scale || 1);
    return <View style={{ height: dim, width: dim }} />;
};

export default Spacer;