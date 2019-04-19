var registerForPush = jest.fn(() => new Promise((res, rej) =>{
    res();
}));

module.exports = registerForPush;