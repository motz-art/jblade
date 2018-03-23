import replaceSelections from './replace-selections';


export default {

    insertNumbers0: function () {
        replaceSelections((text, i) => `${text}${i}`);
    },

    insertNumbers1: function () {
        replaceSelections((text, i) => `${text}${i + 1}`);
    },

};
