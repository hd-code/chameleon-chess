import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { EPlayer } from 'chameleon-chess-logic';
import { EPlayerType } from '../../models/players';

import { getColors, getImages, getTexts } from '../../assets';
import { getBaseFontSize } from '../../helper';

import Overlay, { EOverlayType } from '../basic/Overlay';
import Image from '../basic/Image';
import Text from '../basic/Text';

// -----------------------------------------------------------------------------

export interface PlayerProps {
    /** The player's color. */
    color: EPlayer;
    /** The player's type. '*/
    type: EPlayerType;
    /** If set to true, in addition to the icons, text will be displayed to
     * verbally describe the players color and type as well. */
    verbose?: boolean;
    /** Set to true if this player is already dead. */
    isDead?: boolean;
    /** Set to true if this player is on turn. */
    isOnTurn?: boolean;
    /** Function that will be executed when this player component is clicked. */
    onPress?: () => void;
}

/** A player card that shows information about a player in a game. */
const Player = ({color, type, verbose, isDead, isOnTurn, onPress}: PlayerProps) =>
    <TouchableOpacity
        style={[style, {backgroundColor: getColors().main[color]}]}
        onPress={onPress} activeOpacity={1}
    >
        {verbose && <Text style={{fontWeight: 'bold'}}>
            {getTexts().player[color]}
        </Text>}

        <View style={{aspectRatio: 1, width: '50%'}}>
            <Image source={getImages().playerTypes[type]} onPress={onPress} />
        </View>

        {verbose && <Text style={{fontStyle: 'italic'}}>
            {getTexts().playerType[type]}
        </Text>}

        {isDead && <Overlay type={EOverlayType.DARKEN} />}
        {isOnTurn && <Overlay type={EOverlayType.LIGHTEN} style={whiteFrame} />}
    </TouchableOpacity>
;

export default Player;

// -----------------------------------------------------------------------------

const padding = getBaseFontSize() * .3;

const style: ViewStyle = {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: getColors().basic.black,
    padding,
};

const whiteFrame: ViewStyle = {
    backgroundColor: 'transparent',
    borderColor: getColors().shader.lighten,
    borderWidth: padding,
};