import React from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { getColors, playAudio } from '../../assets';
import { getBaseFontSize } from '../../helper';

import Overlay, { EOverlayType } from './Overlay';
import Text from './Text';

// -----------------------------------------------------------------------------

interface ButtonProps {
    /** Button text */
    text: string;
    /** A Function to be called when button is clicked. */
    onPress: (event: GestureResponderEvent) => void;
    /** Specify the button color as hex string or rgba value. */
    color?: string;
    /** Set to true to disable the button. It can no longer be clicked and is
     * greyed out. */
    disabled?: boolean;
}

/** Basic button element. Use this component instead of the react-native Button.
 * It adheres to the styling of this app and looks identical on all platforms
 * (which is not the case for the react-native Button component).
 * 
 * The button will always fill completely the width of its parent element. */
const Button = ({text, onPress, color, disabled}: ButtonProps) => 
    <TouchableOpacity
        activeOpacity={disabled ? 1 : .9}
        onPress={disabled ? () => {} : (event) => {
            playAudio.click();
            onPress(event);
        }}
        style={[style, color ? {backgroundColor: color} : {}]}
    >
        <Text style={{fontWeight: 'bold'}} invert={true}>{text}</Text>
        {disabled && <Overlay type={EOverlayType.GREYING} style={{borderRadius: padding}}/>}
    </TouchableOpacity>
;

export default Button;

// -----------------------------------------------------------------------------

const padding = getBaseFontSize() * .7;

const style: ViewStyle = {
    backgroundColor: getColors().main[1],
    borderColor: getColors().basic.black,
    borderRadius: padding,
    borderWidth: StyleSheet.hairlineWidth,
    padding,
    width: '100%',
};