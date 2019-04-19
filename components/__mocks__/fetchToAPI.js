const fetchToAPI = jest.fn(() => new Promise((res, rej) => 
    res({
        json: () => ({mocked: "mocked"}) 
    })
));
export default fetchToAPI;