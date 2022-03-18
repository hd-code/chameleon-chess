import React, { FC } from "react";

import type { AppProps } from "web/app";
import { Link } from "web/shared";

// -----------------------------------------------------------------------------

export const Settings: FC<AppProps> = ({ goBack }) => {
  return (
    <div className="text-center">
      <p className="c-white text-border mb-1">
        Einstellungen sind noch nicht verfügbar.
      </p>
      <Link onClick={() => goBack()}>zurück</Link>
    </div>
  );
};
