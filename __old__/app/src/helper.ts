import { Dimensions } from 'react-native';

// -----------------------------------------------------------------------------

/** Returns the dimensions (`height` and `width`) of the screen in pixels. */
export function getDimensions() {
    return Dimensions.get('window');
}

/** Returns either the `height` or the `width` of the screen in pixels. It
 * returns the smaller of the two. */
export function getSmallerDimension() {
    const { height, width } = getDimensions();
    return Math.min(height, width);
}

/** Returns a basic font size in pixels. The font sizes is calculated such that
 * text written in that size is comfortably readable on the current device.
 * Use this as a reference when dealing with text elements. */
export function getBaseFontSize() {
    return Math.max(getSmallerDimension() / 40, MIN_FONT_SIZE);
}

// -----------------------------------------------------------------------------

const MIN_FONT_SIZE = 18;