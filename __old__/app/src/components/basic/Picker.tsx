import React from 'react';
import { Picker as RNPicker, PickerProps as RNPickerProps, ViewStyle } from 'react-native';

import { getColors } from '../../assets';
import { getBaseFontSize } from '../../helper';

// -----------------------------------------------------------------------------

interface PickerProps extends RNPickerProps {
    /** The items to pick from */
    items: {
        label: string,
        value: string,
    }[];
}

/** The react-native picker component with corrected styling. By default the
 * react-native picker component looks very strange. Use this implementation
 * instead and do not worry again about styling the picker component as it is
 * taken care off here. However if needed, all react-native properties
 * (including style) can be use on this component as well. */
const Picker = ({items, style, ...props}: PickerProps) =>
    <RNPicker style={[pickerStyle, style]} {...props}>
        {items.map((item, i) => <RNPicker.Item {...item} key={i} />)}
    </RNPicker>
;

export default Picker;

// -----------------------------------------------------------------------------

const pickerStyle: ViewStyle = {
    backgroundColor: getColors().basic.white,
    justifyContent: 'center',
    overflow: 'hidden',
    height: getBaseFontSize() * 4,
    width: '100%',
};