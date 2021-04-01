import React, { FC } from 'react';

import { Color } from 'core/game-state';

// -----------------------------------------------------------------------------

export enum FieldState {
    normal,
    disabled,
    marked,
}

export interface FieldProps {
    color: Color;
    state: FieldState;
}

const component: FC<FieldProps> = props => {
    const colorClass = mapColorClass[props.color];
    const stateClass = mapStateClass[props.state];
    return <div className={'hw-12 border' + ' ' + colorClass + ' ' + stateClass}></div>;
};
export default component;

// -----------------------------------------------------------------------------

const mapColorClass = {
    [Color.red]: 'bgc-red',
    [Color.green]: 'bgc-green',
    [Color.yellow]: 'bgc-yellow',
    [Color.blue]: 'bgc-blue',
};

const mapStateClass = {
    [FieldState.normal]: '',
    [FieldState.disabled]: 'overlay-dark',
    [FieldState.marked]: 'overlay-bright',
};
