const deviceStorage = {
    saveJWT : jest.fn((token) => {
        return new Promise((res, rej) => {
            res();
        });
    }),

    loadJWT : jest.fn(() => {
        return new Promise((res, rej) => {
            res("TOKEN");
        })
    })
}

export default deviceStorage;