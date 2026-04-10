// utils/transliterate.js

export const transliterateToHindi = async (text) => {
    try {
        const res = await fetch(
            `https://inputtools.google.com/request?text=${text}&itc=hi-t-i0-und&num=5`
        );
 
        const data = await res.json();

        if (data[0] === "SUCCESS") {
            return data[1][0][1][0]; // best suggestion
        }

        return text;
    } catch (err) {
        console.error(err);
        return text;
    }
};