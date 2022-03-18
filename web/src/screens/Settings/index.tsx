import { Link } from "components";
import * as React from "react";
import { ScreenState } from "state/ScreenState";

// -----------------------------------------------------------------------------

interface SettingsScreenProps {
    screenState: ScreenState;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
    screenState,
}) => {
    return (
        <div className="text-center">
            <p className="c-white text-border mb-1">
                Einstellungen sind noch nicht verfügbar.
            </p>
            <Link onClick={() => screenState.goBack()}>zurück</Link>
        </div>
    );
};
