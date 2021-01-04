import React from 'react';

import { FieldColor } from 'core/game-state';

// -----------------------------------------------------------------------------

export enum FieldState { normal, disabled, marked }

export interface FieldProps {
    color: FieldColor;
    state: FieldState;
}

export default function Field(props: FieldProps): JSX.Element {
    const colorClass = mapColorClass[props.color];
    const stateClass = mapStateClass[props.state];
    return <div className={'hw-12 border' + ' ' + colorClass + ' ' + stateClass}></div>;
}

// -----------------------------------------------------------------------------

const mapColorClass = {
    [FieldColor.red]: 'bgc-red',
    [FieldColor.green]: 'bgc-green',
    [FieldColor.yellow]: 'bgc-yellow',
    [FieldColor.blue]: 'bgc-blue',
};

const mapStateClass = {
    [FieldState.normal]: '',
    [FieldState.disabled]: 'overlay-dark',
    [FieldState.marked]: 'overlay-bright',
};