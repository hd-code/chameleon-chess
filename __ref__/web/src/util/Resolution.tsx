import * as React from "react";

export class Resolution {
    static default(): Resolution {
        return new Resolution(0, 0);
    }

    constructor(readonly height: number, readonly width: number) {}

    getMax(): number {
        return Math.max(this.height, this.width);
    }
    getMin(): number {
        return Math.min(this.height, this.width);
    }

    isLandscape(): boolean {
        return this.height < this.width;
    }
}

export function useResolutionRef(): [Resolution, React.Ref<HTMLDivElement>] {
    const [resolution, setResolution] = React.useState(Resolution.default);

    const ref: React.Ref<HTMLDivElement> = (element) => {
        if (element) {
            const h = element.clientHeight;
            const w = element.clientWidth;
            if (h !== resolution.height || w !== resolution.width) {
                setResolution(new Resolution(h, w));
            }
        }
    };

    React.useEffect(() => {
        const refreshResolution = () => {
            setResolution(Resolution.default());
        };
        window.addEventListener("resize", refreshResolution);
        return () => {
            window.removeEventListener("resize", refreshResolution);
        };
    });

    return [resolution, ref];
}
