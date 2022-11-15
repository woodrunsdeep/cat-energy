function capitalizeTitle (value) {
    const small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
    const punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

    let parts = [];
    const split = /[:.;?!] |(?: |^)["Ò]/g;
    let index = 0;

    while (true) {
        let m = split.exec(value);

        parts.push(value.substring(index, m ? m.index : value.length)
            .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function (all) {
                return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
            })
            .replace(RegExp("\\b" + small + "\\b", "ig"), lower)
            .replace(RegExp("^" + punct + small + "\\b", "ig"), function (all, punct, word) {
                return punct + upper(word);
            })
            .replace(RegExp("\\b" + small + punct + "$", "ig"), upper));

        index = split.lastIndex;

        if (m) parts.push(m[0]);
        else break;
    }

    return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
        .replace(/(['Õ])S\b/ig, "$1s")
        .replace(/\b(AT&T|Q&A)\b/ig, function (all) {
            return all.toUpperCase();
        });

    function lower(word) {
        return word.toLowerCase();
    }

    function upper(word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
    }
}

module.exports = capitalizeTitle;
