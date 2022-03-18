import * as React from "react";
import { GameScreen } from "screens/Game";
import { GameSetupScreen } from "screens/GameSetup";
import { HomeScreen } from "screens/Home";
import { SettingsScreen } from "screens/Settings";
import { Screen, useScreenState } from "state/ScreenState";

export const App: React.FC = () => {
    const screenState = useScreenState(Screen.gameSetup);

    const showScreen = (screen: Screen) => {
        switch (screen) {
            case Screen.home:
                return <HomeScreen screenState={screenState} />;
            case Screen.game:
                return <GameScreen screenState={screenState} />;
            case Screen.gameSetup:
                return <GameSetupScreen screenState={screenState} />;
            case Screen.settings:
                return <SettingsScreen screenState={screenState} />;
            default:
                return <div>unbekannter Screen</div>;
        }
    };

    return (
        <div className="font-1 flex flex-x-center flex-y-center hw-100">
            {showScreen(screenState.screen)}
        </div>
    );
};
