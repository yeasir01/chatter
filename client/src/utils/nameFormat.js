/**
 * Gets the full name of a participant with the first letter of the first and last names capitalized.
 *
 * @param {Object} participantObj - The participant object containing first and last names.
 * @param {string} participantObj.firstName - The first name of the participant.
 * @param {string} participantObj.lastName - The last name of the participant.
 * @returns {string} The full name of the participant with the first letters of first and last names capitalized.
 *
 * @example
 * const participant = {
 *   firstName: 'john',
 *   lastName: 'doe'
 * };
 * const fullName = getParticipantFullName(participant);
 * // fullName will be 'John Doe'
 */
const getParticipantFullName = (participantObj) => {
    const firstName = participantObj.firstName.charAt(0).toUpperCase() + participantObj.firstName.slice(1);
    const lastName = participantObj.lastName.charAt(0).toUpperCase() + participantObj.lastName.slice(1);

    return `${firstName} ${lastName}`;
}

export default getParticipantFullName;
