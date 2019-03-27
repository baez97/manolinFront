import { AsyncStorage } from 'react-native';
import deviceStorage from '../components/deviceStorage'
jest.mock('react-native');

describe('Device Storage module testing', () => {

    describe('SaveJWT method', () => {

        it ("Returns an error when AsyncStorage fails", async done => {

            // FORCING AN ERROR IN ASYNC STORAGE
            AsyncStorage.setItem.mockReturnValueOnce(new Promise((res, rej) => {
                rej({message: "THIS IS AN ERROR"});
            }));
            
            // DECLARING MOCK CALLBACK FUNCTIONS
            const expectedMessage = "THIS IS AN ERROR"
            const resolveFn = jest.fn(() => {});
            const rejectFn  = jest.fn(err => {
                expect( err         ).toBeDefined();
                expect( err.message ).toBeDefined();
                expect( err.message ).toBe(expectedMessage);
            });

            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.saveJWT("TOKEN")
            .then ( resolveFn )
            .catch( rejectFn  )

            // ASSERTING THE CALLED FUNCTIONS
            // -- As an error is being tested, the resolve
            // -- function should not be called
            expect( resolveFn ).not.toBeCalled();
            expect( rejectFn  ).toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();

        });
        
        it ("Resolves the promise when everything went well", async done => {

            // DECLARING MOCK CALLBACK FUNCTIONS
            const resolveFn = jest.fn( ()  => {} );
            const rejectFn  = jest.fn( err => {} );

            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.saveJWT("TOKEN")
            .then ( resolveFn )
            .catch( rejectFn  );

            // ASSERTING THE CALLED FUNCTIONS
            // -- As no error should occurr, the reject
            // -- function should not be called
            expect( rejectFn  ).not.toBeCalled();
            expect( resolveFn ).toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();
        });
    });


    describe("LoadJWT method", () => {

        it("Returns an error when Async Storage fails", async done => {

            // FORCING AN ERROR IN ASYNC STORAGE
            AsyncStorage.getItem.mockReturnValueOnce(new Promise((res, rej) => {
                rej({message: "THIS IS AN ERROR"});
            }));

            // DECLARING MOCK CALLBACK FUNCTIONS
            const expectedMessage = "THIS IS AN ERROR"            
            const resolveFn = jest.fn(() => {});
            const rejectFn  = jest.fn(err => {
                expect( err         ).toBeDefined();
                expect( err.message ).toBeDefined();
                expect( err.message ).toBe(expectedMessage);
            });
            
            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.loadJWT()
            .then ( resolveFn )
            .catch( rejectFn  )

            // ASSERTING THE CALLED FUNCTIONS
            // -- As an error is being tested, the resolve
            // -- function should not be called
            expect( resolveFn ).not.toBeCalled();
            expect( rejectFn  ).toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();
        });

        it("Returns false when the token was not found", async done => {

            // FORCING THE TOKEN NO TO BE FOUND
            AsyncStorage.getItem.mockReturnValueOnce(new Promise((res, rej) => {
                res(null);
            }));
            
            // DECLARING MOCK CALLBACK FUNCTIONS
            const resolveFn = jest.fn( token => {
                expect( token ).toBeDefined();
                expect( token ).toBe(false);
            })
            const rejectFn = jest.fn(() => {});

            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.loadJWT()
            .then ( resolveFn )
            .catch( rejectFn  )

            // ASSERTING THE CALLED FUNCTIONS
            // -- We are testing an error that should resolve
            // -- the promise with a false value, so the resolve
            // -- function is the one that should be called
            expect( resolveFn ).toBeCalled();
            expect( rejectFn  ).not.toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();
        });

        it ("Returns the token when everything went well", async done => {
            const expectedToken = "THIS_IS_THE_SAVED_TOKEN";

            // DECLARING MOCK CALLBACK FUNCTIONS
            const resolveFn = jest.fn( token  => {
                expect( token ).toBeDefined();
                expect( token ).toBe(expectedToken);
            });
            const rejectFn  = jest.fn(err => {});

            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.loadJWT()
            .then ( resolveFn )
            .catch( rejectFn  );

            // ASSERTING THE CALLED FUNCTIONS
            // -- As no error should occurr, the reject
            // -- function should not be called
            expect( rejectFn  ).not.toBeCalled();
            expect( resolveFn ).toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();
        });
    });

    describe("RemoveJWT method", () => {
        it("Returns an error when AsyncStorage fails", async done => {

            // FORCING AN ERROR IN ASYNC STORAGE
            AsyncStorage.setItem.mockReturnValueOnce(new Promise((res, rej) => {
                rej({message: "THIS IS AN ERROR"});
            }));

            // DECLARING MOCK CALLBACK FUNCTIONS
            const expectedMessage = "THIS IS AN ERROR"
            const resolveFn = jest.fn(() => {});
            const rejectFn  = jest.fn(err => {
                expect( err         ).toBeDefined();
                expect( err.message ).toBeDefined();
                expect( err.message ).toBe(expectedMessage);
            });

            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.removeJWT()
            .then ( resolveFn )
            .catch( rejectFn  )

            // ASSERTING THE CALLED FUNCTIONS
            // -- As an error is being tested, the resolve
            // -- function should not be called
            expect( resolveFn ).not.toBeCalled();
            expect( rejectFn  ).toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();
        });

        it ("Resolves the promise when everything went well", async done => {

            // DECLARING MOCK CALLBACK FUNCTIONS
            const resolveFn = jest.fn( ()  => {} );
            const rejectFn  = jest.fn( err => {} );

            // PERFORMING THE CALL TO THE METHOD TO BE TESTED
            await deviceStorage.removeJWT()
            .then ( resolveFn )
            .catch( rejectFn  );

            // ASSERTING THE CALLED FUNCTIONS
            // -- As no error should occurr, the reject
            // -- function should not be called
            expect( rejectFn  ).not.toBeCalled();
            expect( resolveFn ).toBeCalled();

            // TELLING JEST THAT THE ASYNC TESTING HAS FINISHED
            done();
        });
    })
});