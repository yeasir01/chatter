class UserStore{
    constructor(){
        this.users = new Map();
    }

    findOrCreateUser(userId){
        if (!this.users.has(userId)){
            this.users.set(userId, {devices: new Set()})
        }
        return this.users.get(userId)
    }

    addDevice(userId, socketId){
        const user = this.findOrCreateUser(userId)
        user.devices.add(socketId)
    }

    deleteDevice(userId, socketId) {
        const user = this.users.get(userId)
        user.devices.delete(socketId)

        if (user.devices.size === 0) {
            this.users.delete(userId)
        }
    }
}

export default UserStore;