import React from 'react';
import { View, ViewStyle } from 'react-native';

import { getImages } from '../assets';
import { getBaseFontSize } from '../helper';

import Image from './basic/Image';
import Logo from './basic/Logo';

import { INavigation } from '../models/view';

// -----------------------------------------------------------------------------

interface TopbarProps {
    /** Navigation functions to go to other views. */
    navigation: INavigation;
}

/** A topbar that gets displayed on almost all views right at the top. It
 * contains a home and a settings button.
 */
const Topbar = ({navigation}: TopbarProps) =>
    <View style={wrapperStyle}>
        <View style={iconStyle}>
            <Image source={getImages().home} onPress={navigation.home} />
        </View>

        <Logo />

        <View style={iconStyle}>
            <Image source={getImages().settings} onPress={navigation.settings} />
        </View>
    </View>
;

export default Topbar;

// -----------------------------------------------------------------------------

const wrapperStyle: ViewStyle= {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: getBaseFontSize() * 4.3,
    width: '100%',
}

const iconStyle: ViewStyle= {
    aspectRatio: 1,
    height: '85%',
}