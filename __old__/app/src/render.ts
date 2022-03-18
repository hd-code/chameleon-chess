export function render() {
    callback();
}

export function registerCallback(cb: () => void) {
    callback = cb
}

// -----------------------------------------------------------------------------

let callback = () => {};