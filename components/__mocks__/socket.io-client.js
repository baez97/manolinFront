const socket = {
    on: jest.fn((chain, callback) => {}),
    emit: jest.fn()
}

export default jest.fn(function SocketIOClient () {
    return socket;
})
