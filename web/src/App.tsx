import * as React from "react";
import { useResolutionRef } from "./util/Resolution"

export const App: React.FC = () => {
    const [resolution, ref] = useResolutionRef();
    return (
        <div
            className="font-1 flex flex-x-center flex-y-center hw-100"
            ref={ref}
        >
            {resolution.height} x {resolution.width}
        </div>
    );
};
