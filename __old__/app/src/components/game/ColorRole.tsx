import React from 'react';
import { View, ViewStyle } from 'react-native';

import { EFieldColor, ERole } from 'chameleon-chess-logic';

import { getColors, getImages } from '../../assets';

import Image from '../basic/Image';

// -----------------------------------------------------------------------------

interface ColorRoleProps {
    color: EFieldColor;
    role: ERole;
}

/** Helper component used in a pawn component to show the color-role mapping. */
const ColorRole = ({color, role}: ColorRoleProps) => 
    <View style={[style, {backgroundColor: getColors().main[color]}]}>
        <Image source={getImages().roles[role]} />
    </View>
;

export default ColorRole;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    height: '50%',
    width: '50%',
};