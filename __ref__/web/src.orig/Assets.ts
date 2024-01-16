export class Assets {
    private constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

    static readonly img = Object.freeze({
        bishop: require("../assets/img/bishop.svg"),
        computer: require("../assets/img/computer.svg"),
        home: require("../assets/img/home.svg"),
        human: require("../assets/img/human.svg"),
        knight: require("../assets/img/knight.svg"),
        none: require("../assets/img/none.svg"),
        queen: require("../assets/img/queen.svg"),
        rook: require("../assets/img/rook.svg"),
        settings: require("../assets/img/settings.svg"),
    });
}
