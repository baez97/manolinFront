import React from 'react';
import renderer from 'react-test-renderer';
import registerForPush from '../components/registerForPush';
import { exportAllDeclaration } from '@babel/types';
import { Notifications, Permissions } from 'expo';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.mock('expo');

describe("RegisterForPush", () => {
    const mockedSocket = {
        emit: jest.fn()
    }

    const mockedName = "NAME";

    it("Does nothing if the permission is not granted after asking the user", async () => {
        Permissions.getAsync.mockReturnValueOnce( {status: "NOT_GRANTED"} );
        Permissions.askAsync.mockReturnValueOnce( {status: "NOT_GRANTED"} );
        await registerForPush(mockedName, mockedSocket);
        expect(mockedSocket.emit).not.toBeCalled();
        expect(Notifications.getExpoPushTokenAsync).not.toBeCalled();
    });
    
    it("Gets the PushToken and calls the socket when the permission was granted", async () => {
        await registerForPush(mockedName, mockedSocket);
        expect(mockedSocket.emit).toBeCalled();
        expect(Notifications.getExpoPushTokenAsync).toBeCalled();
    });

    it("Ask the permission if it was not granted, and works correctly", async () => {
        Permissions.getAsync.mockReturnValueOnce( {status: "NOT_GRANTED"} );
        await registerForPush(mockedName, mockedSocket);
        expect(Permissions.askAsync).toBeCalled();
        expect(mockedSocket.emit).toBeCalled();
        expect(Notifications.getExpoPushTokenAsync).toBeCalled();
    });
});