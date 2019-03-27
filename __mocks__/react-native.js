function AsyncStorageClass() {
    this.setItem = jest.fn((key, value) => {
        return new Promise((resolve, reject) => {
            resolve();
        })
    });

    this.getItem = jest.fn((key, value) => {
        return new Promise((resolve, reject) => {
            resolve("THIS_IS_THE_SAVED_TOKEN");
        })
    });

    this.removeItem = jest.fn((key) => {
        return  new Promise((resolve, reject) => {
            resolve();
        })
    });

    this.removeItem.mockReturnValueOnce(new Promise((res,rej) => {
        rej({message: "THIS IS AN ERROR"});
    }))
}

module.exports.AsyncStorage = new AsyncStorageClass();