export function split_bands_arena(title: String) {
    const last_bracket = title.lastIndexOf(")");
    const title_sliced = title.slice(0, last_bracket + 1);
    const bands_sliced = title.split(" + ")
    return bands_sliced;
}

export function split_bands_ptt(title: String) {
    const last_bracket = title.lastIndexOf(")");
    const title_sliced = title.slice(0, last_bracket + 1);
    const bands_sliced = title.split(" | ")
    return bands_sliced;
}

export function split_bands_venster(title: String) {
    const bands_sliced = title.split(" + ");
    return bands_sliced;
}