const socket = {
    on: jest.fn((chain, callback) => {
        callback()
    })
}

export default function SocketIOClient () {
    return socket;
}
