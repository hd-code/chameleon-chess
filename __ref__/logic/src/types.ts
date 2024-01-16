export type Color = "red" | "green" | "yellow" | "blue";

export type Role = "knight" | "queen" | "bishop" | "rook";

export type Roles = {[fieldColor in Color]: Role};
