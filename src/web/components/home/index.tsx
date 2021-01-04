import React from 'react';

import Logo from '../shared/logo';

import { GameState, isGameOver } from 'core/game';
import { View, ViewState } from 'core/view';

// -----------------------------------------------------------------------------

interface HomeProps extends GameState, ViewState {}

export default function Home(props: HomeProps): JSX.Element {
    return <div className='flex col center mxw-20em'>
        <Logo className='mb fz-300' />

        <button className='mb bgc-red'
            disabled={isGameOver(props.game)}
            onClick={() => props.goTo(View.game)}
        >Fortsetzen</button>

        <button className='mb bgc-green' onClick={() => props.goTo(View.setup)}>
            Neues Spiel
        </button>

        <button className='mb bgc-yellow' onClick={() => props.goTo(View.settings)}>
            Einstellungen
        </button>

        <button className="bgc-blue" disabled>
            Tutorial
        </button>
    </div>;
}