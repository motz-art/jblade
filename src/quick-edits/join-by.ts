import replaceSelection from './replace-selections';

export default {
    joinBy: function () {
        replaceSelection((text, i, selections) => i < selections.length - 1 ? `${text},`: text);
    }
};
