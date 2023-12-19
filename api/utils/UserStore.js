/**
 * @todo Swap to redis
 * @classdesc Represents a user store.
 */
class UserStore {
    constructor() {
        this.users = new Map();
    }

    /**
     * Finds or creates a user based on the provided user ID.
     *
     * @param {string} userId - The ID of the user.
     * @returns {Object} The user object containing a Set of devices.
     */
    findOrCreateUser(userId) {
        if (!this.users.has(userId)) {
            this.users.set(userId, { devices: new Set() });
        }
        return this.users.get(userId);
    }

    /**
     * Adds a device to the user identified by the given user ID.
     *
     * @param {string} userId - The ID of the user.
     * @param {string} socketId - The ID of the socket or device to be added.
     */
    addDevice(userId, socketId) {
        const user = this.findOrCreateUser(userId);
        user.devices.add(socketId);
    }

    /**
     * Deletes a device from the user identified by the given user ID.
     *
     * @param {string} userId - The ID of the user.
     * @param {string} socketId - The ID of the socket or device to be deleted.
     * @returns {number|null} The number of remaining devices for the user, or null if the user is deleted.
     */
    deleteDevice(userId, socketId) {
        const user = this.users.get(userId);
        user.devices.delete(socketId);

        const deviceSize = user.devices.size;

        if (deviceSize === 0) {
            this.users.delete(userId);
            return null;
        } else {
            return deviceSize;
        }
    }

    /**
     * Gets the devices associated with the user identified by the given user ID.
     *
     * @param {string} userId - The ID of the user.
     * @returns {Set<string>|null} The Set of devices for the user, or null if the user is not found.
     */
    getDevices(userId) {
        const user = this.users.get(userId);
        return user ? user.devices : null;
    }

    /**
     * Checks if the user identified by the given user ID is online.
     *
     * @param {string} userId - The ID of the user.
     * @returns {boolean} True if the user is online; otherwise, false.
     */
    userIsOnline(userId) {
        return this.users.has(userId);
    }
}

/**
 * @type {UserStore}
 * @description An instance of the UserStore class.
 */
const store = new UserStore();

export { store };
