import React, { FC } from "react";

import type { AppProps } from "web/app";
import { Link } from "web/shared";

// -----------------------------------------------------------------------------

export const About: FC<AppProps> = ({ goBack }) => {
  return (
    <div className="text-center">
      <p className="c-white text-border mb-1">
        Über uns ist noch nicht verfügbar.
      </p>
      <Link onClick={() => goBack()}>zurück</Link>
    </div>
  );
};
