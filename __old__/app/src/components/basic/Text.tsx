import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { getColors } from '../../assets';
import { getBaseFontSize } from '../../helper';

// -----------------------------------------------------------------------------

interface TextProps extends RNTextProps{
    /** Scale the font size relative to the devices base font size. This method
     * of setting the font size should be preferred to setting it absolutely. */
    scale?: number;
    /** Flips font color from black to white with black outline. */
    invert?: boolean;
    // children can always be passed, this declaration is just there to satisfy
    // typescript ;-)
    children?: any;
}

/** This is a basic component to display text. It is basically the react-native
 * Text component with some additions. All properties from the react-native
 * Text component are available. Also, the text adheres to the basic text
 * styling of the app. Therefore, it is recommended to use this component
 * instead of the react-native Text component, as you do not have to worry about
 * the correct styling.
 * b
 * There are also additional properties for scaling the text relative to the
 * font size (`scale`), which is highly recommended over setting the font size
 * with absolute values.
 * 
 * And the standard black text color can be inverted to be white with a black
 * outline for readability (`invert`). These are the basic text stylings used in
 * this app.
 * 
 * Nesting of Text components as described in the
 * [react-native documentation](https://facebook.github.io/react-native/docs/text)
 * can be done with this component as well.
 * ```ts
 * <Text>Hello <Text scale={1.5}>world</Text></Text>
 * ```
 */
const Text = ({invert, scale, style, ...props}: TextProps) => {
    const fontSize = getBaseFontSize() * (scale || 1);
    const textStyle = [baseStyle, invert ? invertStyle : {}, {fontSize}, style];
    return <RNText style={textStyle} {...props}/>;
}

export default Text;

// -----------------------------------------------------------------------------

const baseStyle: TextStyle = {
    // fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
};

const invertStyle: TextStyle = {
    color: getColors().basic.white,
    textShadowColor: getColors().basic.black,
    textShadowOffset: {height: 0, width: 0},
    textShadowRadius: 1,
};