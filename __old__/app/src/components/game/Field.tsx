import React from 'react';
import { View, ViewStyle } from 'react-native';

import { EFieldColor } from 'chameleon-chess-logic';

import { getColors } from '../../assets';

import Overlay, { EOverlayType } from '../basic/Overlay';

// -----------------------------------------------------------------------------

export interface FieldProps {
    key: string;
    color: EFieldColor;
    isOffLimits: boolean;
    isTarget: boolean;
}

/** A field on the game board. */
const Field = ({color, isOffLimits, isTarget}: FieldProps) => 
    <View style={[style, {backgroundColor: getColors().main[color]}]}>
        {isOffLimits && <Overlay type={EOverlayType.DARKEN} />}
        {isTarget && <Overlay type={EOverlayType.LIGHTEN} />}
    </View>
;

export default Field;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    borderWidth: 1,
    borderColor: getColors().basic.black,
    height: '12.5%',
    width: '12.5%',
};