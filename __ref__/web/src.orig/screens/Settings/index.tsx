import * as React from "react";
import { Link } from "../../components";
import { ScreenState } from "../../state/ScreenState";

// -----------------------------------------------------------------------------

type SettingsScreenProps = ScreenState;

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ goBack }) => {
    return (
        <div className="text-center">
            <p className="c-white text-border mb-1">
                Einstellungen sind noch nicht verfügbar.
            </p>
            <Link onClick={() => goBack()}>zurück</Link>
        </div>
    );
};
