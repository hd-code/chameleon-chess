import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { getTexts, playAudio } from '../assets';
import { getBaseFontSize } from '../helper';

import { EPlayer } from 'chameleon-chess-logic';
import { getDefaultPlayers, isEnoughPlayers, TPlayers, getNextPlayerType } from '../models/players';
import { INavigation } from '../models/view';

import Button from './basic/Button';
import Player from './game/Player';
import Spacer from './basic/Spacer';
import Text from './basic/Text';

// -----------------------------------------------------------------------------

interface GameConfigProps {
    /** Navigation functions to go to other views. */
    navigation: INavigation;
    /** Is called when the user tries to start a new game. Returns true if that
     * was successful. */
    onBeginGame: (players: TPlayers) => boolean;
}

/** The root component for the game configuration view. */
const GameConfig = ({navigation, onBeginGame}: GameConfigProps) => {
    const [players, setPlayers] = useState(getDefaultPlayers());
    const texts = getTexts().playerConfig;

    function changePlayer(player: EPlayer) {
        playAudio.click();
        let newPlayers = {...players};
        newPlayers[player] = getNextPlayerType(players[player]);
        setPlayers(newPlayers);
    }

    function beginGame() {
        if (onBeginGame(players)) {
            navigation.game();
        }
    }

    return <View style={wrapperStyle}>
        <Text invert={true} scale={1.8}>{texts.heading}</Text>
        <Spacer />
        <View style={{flexDirection: 'row'}}>
            {getPlayer(EPlayer.RED, players, changePlayer)}
            {getPlayer(EPlayer.BLUE, players, changePlayer)}
            {getPlayer(EPlayer.YELLOW, players, changePlayer)}
            {getPlayer(EPlayer.GREEN, players, changePlayer)}
        </View>
        <Spacer />
        <Text invert={true}>{texts.subText}</Text>
        <Spacer />
        <View style={{width: '80%'}}>
            <Button
                text={texts.button} onPress={beginGame}
                disabled={!isEnoughPlayers(players)}
            />
        </View>
    </View>;
}

export default GameConfig;

// -----------------------------------------------------------------------------

const wrapperStyle: ViewStyle = {
    alignItems: 'center',
    maxWidth: '100%',
    width: getBaseFontSize() * 28,
};

function getPlayer(player: EPlayer, players: TPlayers, onPress: (player: EPlayer) => void) {
    return <View style={{width: '25%'}}>
        <Player
            color={player} type={players[player]} verbose={true}
            onPress={() => {onPress(player)}}
        />
    </View>;
}