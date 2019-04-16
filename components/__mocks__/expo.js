const Permissions = {
    getAsync: jest.fn(() => {
        return { status: "granted" }
    }),
    NOTIFICATIONS: jest.fn(),
    askAsync: jest.fn(() => {
        return { status: "granted" }
    }),
}

const Notifications = {
    getExpoPushTokenAsync: jest.fn(() => ("TOKEN"))
}

module.exports.Permissions = Permissions;
module.exports.Notifications = Notifications;