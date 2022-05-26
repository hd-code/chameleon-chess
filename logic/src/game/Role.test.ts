import { testFunc } from "../util/testutil";

import { Role, isRole } from "./Role";

// -----------------------------------------------------------------------------

describe("Role", () => {
    testFunc(isRole, [
        [[Role.knight], true],
        [[Role.queen], true],
        [[Role.bishop], true],
        [[Role.rook], true],
        [[1.4], false],
        [[-3], false],
        [[12], false],
        [["string"], false],
    ]);
});
