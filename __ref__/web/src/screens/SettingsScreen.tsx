import * as React from "react";

// -----------------------------------------------------------------------------

type SettingsScreenProps = {};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ }) => {
    return (
        <div className="text-center">
            <p className="c-white text-border mb-1">
                Einstellungen sind noch nicht verfügbar.
            </p>
            {/* <Link onClick={() => console.log("zurück!")}>zurück</Link> */}
        </div>
    );
};
