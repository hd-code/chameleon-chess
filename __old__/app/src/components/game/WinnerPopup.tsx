import React from 'react';
import { ViewStyle } from 'react-native';

import { getColors, getTexts } from '../../assets';
import { getBaseFontSize } from '../../helper';

import { EPlayer } from 'chameleon-chess-logic';
import { TPlayers } from '../../models/players';
import { INavigation } from '../../models/view';

import Button from '../basic/Button';
import Popup from '../basic/Popup';
import Spacer from '../basic/Spacer';
import Text from '../basic/Text';

// -----------------------------------------------------------------------------

interface WinnerPopupProps {
    /** The player, who won the game. */
    winner: EPlayer;
    /** Players participating in the game. */
    players: TPlayers;
    /** Navigation functions to go to other views. */
    navigation: INavigation;
    /** Gets called, when the user chooses to replay the game. */
    onBeginGame: (players: TPlayers) => boolean;
}

/** The root component for the game view. */
const WinnerPopup = ({winner, players, navigation, onBeginGame}: WinnerPopupProps) =>
    <Popup style={style}>
        <Text invert={true} scale={1.7}>
            {getTexts().player[winner]} {getTexts().game.winning}
        </Text>
        <Spacer />
        <Button text={getTexts().game.buttons.home} onPress={navigation.home} color={getColors().main[0]} />
        <Spacer scale={.5} />
        <Button text={getTexts().game.buttons.newGame} onPress={navigation.gameConfig} />
        <Spacer scale={.5} />
        <Button text={getTexts().game.buttons.replay} onPress={() => {
            onBeginGame(players);
            navigation.game();
        }} color={getColors().main[2]} />
    </Popup>
;

export default WinnerPopup;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    maxWidth: '100%',
    width: getBaseFontSize() * 24,
}