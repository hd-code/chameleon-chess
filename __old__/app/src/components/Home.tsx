import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IGameState } from 'chameleon-chess-logic';
import { INavigation } from '../models/view';

import { getColors, getTexts } from '../assets';
import { getBaseFontSize } from '../helper';

import Button from './basic/Button';
import Logo from './basic/Logo';
import Spacer from './basic/Spacer';

// -----------------------------------------------------------------------------

interface HomeProps {
    /** The current game state in the cache. */
    game: IGameState|null;
    /** Navigation functions to go to other views. */
    navigation: INavigation;
}

/** The root component for the home view. This is the start screen of the app. */
const Home = ({game, navigation}: HomeProps) => {
    const buttonsTexts = getTexts().home.buttons;

    return <View style={STYLES.wrapper}>
        <Logo />
        <Spacer scale={2} />
        <Button 
            text={buttonsTexts.continue}
            onPress={navigation.game}
            color={getColors().main[0]}
            disabled={game === null}
        />
        <Spacer />
        <Button 
            text={buttonsTexts.newGame}
            onPress={navigation.gameConfig}
            color={getColors().main[1]}
        />
        <Spacer />
        <Button 
            text={buttonsTexts.tutorial}
            onPress={() => {}}
            color={getColors().main[2]}
            disabled={true}
        />
        <Spacer />
        <Button 
            text={buttonsTexts.settings}
            onPress={navigation.settings}
            color={getColors().main[3]}
        />
    </View>;
};

export default Home;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    wrapper: {
        width: getBaseFontSize() * 28,
        maxWidth: '100%',
    },
});