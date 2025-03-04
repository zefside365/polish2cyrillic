document.addEventListener('DOMContentLoaded', function() {
    const polishTextarea = document.getElementById('polishText');
    const cyrillicTextarea = document.getElementById('cyrillicText');
    const convertButton = document.getElementById('convertButton');

    const polishToCyrillic = {
        'a': 'а', 'ą': 'ą',
        'b': 'б', 'c': 'ц', 'ć': 'ць',
        'd': 'д', 'e': 'е', 'ę': 'ę',
        'f': 'ф', 'g': 'г', 'h': 'х',
        'i': 'и', 'j': 'й', 'k': 'к',
        'l': 'л', 'ł': 'у',
        'm': 'м', 'n': 'н', 'ń': 'нь',
        'o': 'о', 'ó': 'у',
        'p': 'п', 'r': 'р', 's': 'с',
        'ś': 'сь',
        't': 'т', 'u': 'у', 'w': 'в',
        'y': 'ы', 'z': 'з', 'ź': 'зь',
        'ż': 'ж',
        'ch': 'х', 'cz': 'ч', 'dz': 'дз',
        'dź': 'дзь', 'dż': 'дж', 'rz': 'рж',
        'sz': 'ш'
    };

    function convertToCyrillic(text) {
        let result = "";
        let i = 0;
        text = text.toLowerCase();

        while (i < text.length) {
            if (i < text.length - 1 && polishToCyrillic[text.substring(i, i + 2)]) {
                result += polishToCyrillic[text.substring(i, i + 2)];
                i += 2;
            } else if (polishToCyrillic[text[i]]) {
                result += polishToCyrillic[text[i]];
                i += 1;
            } else {
                result += text[i];
                i += 1;
            }
        }
        return result;
    }

    convertButton.addEventListener('click', function() {
        const polishText = polishTextarea.value;
        const cyrillicText = convertToCyrillic(polishText);
        cyrillicTextarea.value = cyrillicText;
    });
});