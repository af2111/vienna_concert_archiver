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
//arena wien enters countries of the band they're hosting. this function takes a band name string
//from arena wien and extracts the country code
export function get_arena_country_code(arena_band_name: String) {
    const pos = arena_band_name.indexOf("(") + 1;
    return arena_band_name.slice(pos, arena_band_name.lastIndexOf(")")).toUpperCase();
}