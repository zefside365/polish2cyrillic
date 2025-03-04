document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const toCyrillicButton = document.getElementById("toCyrillicButton");
    const toPolishButton = document.getElementById("toPolishButton");
    const copyButton = document.getElementById("copyButton");
    const clearButton = document.getElementById("clearButton");

    // Updated Polish-to-Cyrillic mapping with better handling of 'się' and overlaps
    const polishToCyrillic = {
        'a': 'а', 'ą': 'он', 'b': 'б', 'c': 'ц', 'ć': 'ць',
        'd': 'д', 'e': 'е', 'ę': 'ен', 'f': 'ф', 'g': 'г',
        'h': 'х', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л',
        'ł': 'в', 'm': 'м', 'n': 'н', 'ń': 'нь', 'o': 'о',
        'ó': 'у', 'p': 'п', 'r': 'р', 's': 'с', 'ś': 'сь',
        't': 'т', 'u': 'у', 'w': 'в', 'y': 'ы', 'z': 'з',
        'ź': 'зь', 'ż': 'ж', 'ch': 'х', 'cz': 'ч', 'dz': 'дз',
        'dź': 'дзь', 'dż': 'дж', 'rz': 'рж', 'sz': 'ш',
        'się': 'ше',  // Special case for common Polish reflexive pronoun
        // Uppercase
        'A': 'А', 'Ą': 'ОН', 'B': 'Б', 'C': 'Ц', 'Ć': 'ЦЬ',
        'D': 'Д', 'E': 'Е', 'Ę': 'ЕН', 'F': 'Ф', 'G': 'Г',
        'H': 'Х', 'I': 'И', 'J': 'Й', 'K': 'К', 'L': 'Л',
        'Ł': 'В', 'M': 'М', 'N': 'Н', 'Ń': 'НЬ', 'O': 'О',
        'Ó': 'У', 'P': 'П', 'R': 'Р', 'S': 'С', 'Ś': 'СЬ',
        'T': 'Т', 'U': 'У', 'W': 'В', 'Y': 'Ы', 'Z': 'З',
        'Ź': 'ЗЬ', 'Ż': 'Ж', 'CH': 'Х', 'CZ': 'Ч', 'DZ': 'ДЗ',
        'DŹ': 'ДЗЬ', 'DŻ': 'ДЖ', 'RZ': 'РЖ', 'SZ': 'Ш',
        'SIĘ': 'ШЕ'
    };

    // Reverse mapping
    const cyrillicToPolish = {};
    for (const key in polishToCyrillic) {
        cyrillicToPolish[polishToCyrillic[key]] = key;
    }

    function convertToCyrillic(text) {
        let result = "";
        let i = 0;
        while (i < text.length) {
            //Check longer sequences first, case-insensitively
            let found = false;
            for (let length of [3, 2]) {
                if (i + length <= text.length) {
                    const sub = text.substring(i, i + length);
                    const subLower = sub.toLowerCase(); // Convert to lowercase for lookup

                    if (polishToCyrillic[sub]) { //Original case
                        result += polishToCyrillic[sub];
                        i += length;
                        found = true;
                        break;
                    }
                     else if (polishToCyrillic[subLower]) { // Lowercase
                        result += polishToCyrillic[subLower];
                        i += length;
                        found = true;
                        break;
                    }
                }
            }

            if (!found && polishToCyrillic[text[i]]) {
                result += polishToCyrillic[text[i]];
                i += 1;
            } else if (!found) {
                result += text[i];
                i += 1;
            }
        }
        return result;
    }



    function convertToPolish(text) {
        let result = "";
        let i = 0;
        while (i < text.length) {
            // Check longer sequences first
            let found = false;
            for (let length of [3, 2, 1]) {
                if (i + length <= text.length) {
                    let substring = text.substring(i, i + length);
                    if (cyrillicToPolish[substring]) {
                        result += cyrillicToPolish[substring];
                        i += length;
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                result += text[i];
                i += 1;
            }
        }
        return result;
    }


    function displayOutput(text) {
        outputText.value = text;
    }

    function copyToClipboard() {
        if (outputText.value) {
            navigator.clipboard.writeText(outputText.value)
                .then(() => {
                    alert("Output copied to clipboard!"); // Consider a better UI notification
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                    alert("Failed to copy to clipboard.");
                });
        } else {
            alert("No output text to copy.");
        }
    }

    function clearText() {
        inputText.value = "";
        outputText.value = "";
    }

    toCyrillicButton.addEventListener("click", function() {
        displayOutput(convertToCyrillic(inputText.value));
    });

    toPolishButton.addEventListener("click", function() {
        displayOutput(convertToPolish(inputText.value));
    });

    copyButton.addEventListener("click", copyToClipboard);

    clearButton.addEventListener("click", clearText);
});
