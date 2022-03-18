import React from 'react';
import { View, ViewStyle } from 'react-native';

import { IPawn, EFieldColor } from 'chameleon-chess-logic';

import { getColors } from '../../assets';
import { getSmallerDimension } from '../../helper';

import Overlay, { EOverlayType } from '../basic/Overlay';
import ColorRole from './ColorRole';

// -----------------------------------------------------------------------------

export interface PawnProps extends IPawn {
    /** React-native uses this to find out, which of the pawns have moved to
     * correctly render movement animations. */
    key: string;
    /** Set to true if this pawn was selected by the user. */
    selected?: boolean;
}

/** A pawn in the game. */
const Pawn = ({player, position, roles, selected}: PawnProps) => {
    const dynStyle: ViewStyle = {
        backgroundColor: getColors().main[player],
        top:  position.row * 12.5 + .5 + '%',
        left: position.col * 12.5 + .5 + '%',
    };

    return <View style={[style, dynStyle]}>
        <View style={colorRoleWrapper}>
            <ColorRole color={EFieldColor.RED} role={roles[EFieldColor.RED]} />
            <ColorRole color={EFieldColor.GREEN} role={roles[EFieldColor.GREEN]} />
            <ColorRole color={EFieldColor.YELLOW} role={roles[EFieldColor.YELLOW]} />
            <ColorRole color={EFieldColor.BLUE} role={roles[EFieldColor.BLUE]} />
        </View>
        {selected && <Overlay type={EOverlayType.LIGHTEN} />}
    </View>;
};

export default Pawn;

// -----------------------------------------------------------------------------

const padding = getSmallerDimension() * 0.115 * 0.1;

const style: ViewStyle = {
    borderColor: getColors().basic.black,
    borderRadius: padding,
    borderWidth: 1,
    height: '11.5%',
    width: '11.5%',
    padding,
    position: 'absolute',
};

const colorRoleWrapper: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
};