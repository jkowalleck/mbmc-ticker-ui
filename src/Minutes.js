export default {
    /**
     * @param {number} value integer minutes since midnight
     * @returns {string} format HH:MM
     */
    toTime: function (value) {
        const hours = String(Math.floor(value / 60));
        const minutes = String(value % 60);
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    },

    /**
     * @param {string} value format HH:MM
     * @returns {number} integer minutes since midnight
     */
    fromTime: function (value) {
        const parts = value.split(':');
        const hours = Number(parts[0]);
        const minutes = Number(parts[1]);
        return hours * 60 + minutes;
    }
};
