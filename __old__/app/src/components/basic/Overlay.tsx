import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

import { getColors } from '../../assets';

// -----------------------------------------------------------------------------

/** The available overlay types. They effect the color of an overlay. */
export enum EOverlayType { DARKEN, GREYING, LIGHTEN }

interface OverlayProps extends ViewProps {
    type: EOverlayType;
    // children can always be passed, this declaration is just there to satisfy
    // typescript ;-)
    children?: any;
}

/** This component completely covers its parent element. It has a 
 * semi-transparent background. Depending on the overlay type it will darken,
 * grey out or lighten its parent.
 * 
 * The overlay is a react-native View component. Therefore, all react-native
 * View Properties can be used to further style this component. Therefore, it is
 * also possible to add children to an overlay.*/
const Overlay = ({style, type, ...props}: OverlayProps) => 
    <View style={[StyleSheet.absoluteFill, {backgroundColor: shades[type]}, style]}
        {...props}
    />
;

export default Overlay;

// -----------------------------------------------------------------------------

const shades = {
    [EOverlayType.DARKEN]: getColors().shader.darken,
    [EOverlayType.GREYING]: getColors().shader.greying,
    [EOverlayType.LIGHTEN]: getColors().shader.lighten,
}