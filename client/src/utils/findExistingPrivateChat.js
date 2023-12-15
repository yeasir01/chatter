
/**
 * Finds an existing one-one chat in an array based on participant ID's.
 *
 * @param {Array} chatsArray - An array of chat objects to search through.
 * @param {Array} participantsArray - An array of participant IDs to match against.
 * @returns {string|null} - Returns the ID of the matching chat, or null if no match is found.
 */
const findExistingPrivateChat = (chatsArray, participantsArray) => {
    const chat = chatsArray.find((obj) => {
        // If the chat is a group skip additional checks
        if (obj.group) {return false}
        // Check if all id's are included in the participants array
        return participantsArray.every((id) => obj.participants.includes(id));
    });

    // Returns the ID of the matching chat, or null if no match is found.
    return chat ? chat.id : null;
};

export default findExistingPrivateChat;
