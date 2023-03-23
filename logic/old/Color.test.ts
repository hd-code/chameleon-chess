import { testFunc } from "./util/testutil";
import { Color, isColor } from "./Color";

// -----------------------------------------------------------------------------

describe("Color", () => {
    testFunc(isColor, [
        [[Color.red], true],
        [[Color.green], true],
        [[Color.yellow], true],
        [[Color.blue], true],
        [[1.4], false],
        [[-3], false],
        [[12], false],
        [["string"], false],
    ]);
});
