import React, { useState } from 'react';
import { LayoutChangeEvent, TextStyle, View } from 'react-native';

import { getColors, getTexts } from '../../assets';

import Text from './Text';

// -----------------------------------------------------------------------------

/** This component renders the chameleon chess logo in the correct language. It
 * also resizes automatically to completely fill either the height or the width
 * of the parent component. */
const Logo = () => {
    // Calculate the font size once this component is rendered and the dimensions
    // are know.
    const [fontSize, setFontSize] = useState(0);
    function calcFontSize(event: LayoutChangeEvent) {
        if (fontSize === 0) {
            const { width } = event.nativeEvent.layout;
            setFontSize(width / widthDivider);
        }
    }

    const textStyle: TextStyle = {
        lineHeight: fontSize * 1.1,
        fontSize,
        fontWeight: 'bold',
    };
    const letters = getTexts().logo.split('');

    return <View style={{aspectRatio: 2.5}} onLayout={calcFontSize}>
        <Text>
            {letters.map((letter, i) => <Text key={i} invert={true}
                style={[textStyle, {color: colors[i % colors.length]}]}
            >
                {letter}
            </Text>)}
        </Text>
    </View>;
};

export default Logo;

// -----------------------------------------------------------------------------

const colors = [
    getColors().main[0],
    getColors().main[1],
    getColors().main[2],
    getColors().main[3],
];

const widthDivider = 5.7;