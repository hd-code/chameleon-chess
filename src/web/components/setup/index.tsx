import React from 'react';

// -----------------------------------------------------------------------------

interface SetupProps {}

export default function Setup(props: SetupProps): JSX.Element {
    return <div className='text-center'>
        <h1>Neues Spiel starten</h1>
        <div className='flex'>
            <div>Player Red</div>
            <div>Player Green</div>
            <div>Player Yellow</div>
            <div>Player Blue</div>
        </div>
        <p>Hinweisetext</p>
        <h2>KI-Level</h2>
        <select name="ki">
            <option value="0">easy</option>
            <option value="1">normal</option>
            <option value="2">hard</option>
        </select>
    </div>;
}