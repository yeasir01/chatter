
/**
 * Finds an existing chat in an array based on participant ID's.
 *
 * @param {Array} chatsArray - An array of chat objects to search through.
 * @param {Array} participantsArray - An array of participant IDs to match against.
 * @returns {string|null} - Returns the ID of the matching chat, or null if no match is found.
 */
const findExistingChat = (chatsArray, participantsArray) => {
    const chat = chatsArray.find((obj) => {
        // Check if all id's are included in the participants array
        return participantsArray.every((id) => obj.participants.includes(id));
    });

    // Returns the ID of the matching chat, or null if no match is found.
    return chat ? chat.id : null;
};

export default findExistingChat;
