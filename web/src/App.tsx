import * as React from "react";

import { AsyncStorageImpl } from "./AsyncStorageImpl";
import { GameScreen } from "./screens/Game";
import { GameSetupScreen } from "./screens/GameSetup";
import { HomeScreen } from "./screens/Home";
import { SettingsScreen } from "./screens/Settings";
import { useGameState } from "./state/GameState";
import { Screen, useScreenState } from "./state/ScreenState";

export const App: React.FC = () => {
    const store = new AsyncStorageImpl();

    const gameState = useGameState(store);
    const screenState = useScreenState(Screen.home);

    const { height, width, appRef } = useDimensions();

    const showScreen = (screen: Screen) => {
        switch (screen) {
            case Screen.home:
                return <HomeScreen {...screenState} {...gameState} />;
            case Screen.game:
                return (
                    <GameScreen
                        height={height}
                        width={width}
                        {...screenState}
                        {...gameState}
                    />
                );
            case Screen.gameSetup:
                return <GameSetupScreen {...screenState} {...gameState} />;
            case Screen.settings:
                return <SettingsScreen {...screenState} />;
            default:
                return <div>unbekannter Screen</div>;
        }
    };

    return (
        <div
            className="font-1 flex flex-x-center flex-y-center hw-100"
            ref={appRef}
        >
            {showScreen(screenState.screen)}
        </div>
    );
};

// -----------------------------------------------------------------------------

function useDimensions(): {
    height: number;
    width: number;
    appRef: (div: HTMLDivElement | null) => void;
} {
    const [{ height, width }, setDimensions] = React.useState({
        height: 0,
        width: 0,
    });

    const appRef = (div: HTMLDivElement | null) => {
        if (div) {
            const newHeight = div.clientHeight;
            const newWidth = div.clientWidth;
            if (newHeight !== height || newWidth !== width) {
                setDimensions({ height: newHeight, width: newWidth });
            }
        }
    };

    React.useEffect(() => {
        const refreshDimensions = () => {
            setDimensions({ height: 0, width: 0 });
        };

        window.addEventListener("resize", refreshDimensions);

        return () => {
            window.removeEventListener("resize", refreshDimensions);
        };
    });

    return { height, width, appRef };
}
