import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';

import { getColors, playAudio } from '../../assets';

// -----------------------------------------------------------------------------

interface SwitchProps extends RNSwitchProps {}

/** The react-native switch component with some custom styling. Use this
 * component instead of the original react-native component to keep the styling
 * consistent. */
const Switch = ({onValueChange, thumbColor, trackColor, ...props}: SwitchProps) => 
    <RNSwitch
        onValueChange={(value: boolean) => {
            playAudio.click();
            onValueChange && onValueChange(value);
        }}
        trackColor={trackColor ? trackColor : lineColors}
        thumbColor={thumbColor ? thumbColor : knopColor}
        {...props}
    />
;

export default Switch;

// -----------------------------------------------------------------------------

const lineColors = {
    false: getColors().shader.darken,
    true: getColors().main[1],
};

const knopColor = getColors().basic.white;