// import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import React from 'react';
import renderer from 'react-test-renderer';
import TurnViewWithDate from '../components/homeComponents/turnViewWithDate';

jest.unmock("react-native")
jest.unmock('react')
jest.unmock("react-test-renderer")
jest.unmock('expo');

it('TurnViewWithDate renders correctly', () => {
    const props = {
        day     : 1,
        month   : 1,
        year    : 2019,
        turn    : 'M',
        weekday : 2
    }
    const rendered = renderer.create(
        <TurnViewWithDate turnObject={{...props}}/>
    ).toJSON();

    expect( rendered ).toMatchSnapshot();
});

it('Weekends are painted in blue', () => {
    const props = {
        day     : 1,
        month   : 1,
        year    : 2019,
        turn    : 'M',
        weekday : 6
    }
    const rendered = renderer.create(
        <TurnViewWithDate turnObject={{...props}}/>
    ).toJSON();

    const [ color1, color2 ] = rendered.children[1].props.colors;
    expect(color1).toBe(4289914618);
    expect(color2).toBe(4285250006);
});

it('Ordinary days are painted in white', () => {
    const props = {
        day     : 1,
        month   : 1,
        year    : 2019,
        turn    : 'M',
        weekday : 2
    }
    const rendered = renderer.create(
        <TurnViewWithDate turnObject={{...props}}/>
    ).toJSON();

    const [ color1, color2 ] = rendered.children[1].props.colors;
    expect(color1).toBe(4294572537);
    expect(color2).toBe(4291742924);
});

describe('Its methods:', () => {

    const dateObj = new Date();
    const today = {
        day   : dateObj.getDate(),
        month : dateObj.getMonth() +1,
        year  : dateObj.getFullYear()
    }

    describe('IsToday method', () => {
        it('Returns false if the year is not correct', () => {
            const props = {
                day     : today.day,
                month   : today.month,
                year    : today.year-2,
                turn    : 'M',
                weekday : 2
            }
            const rendered = new TurnViewWithDate({turnObject: props});

            expect( rendered.isToday() ).toBe(false);
        });

        it('Returns false if the month is not correct', () => {
            const props = {
                day     : today.day,
                month   : today.month+2,
                year    : today.year,
                turn    : 'M',
                weekday : 2
            }
            const rendered = new TurnViewWithDate({turnObject: props});

            expect( rendered.isToday() ).toBe(false);
        });

        it('Returns false if the day is not correct', () => {
            const props = {
                day     : today.day +2,
                month   : today.month,
                year    : today.year,
                turn    : 'M',
                weekday : 2
            }
            const rendered = new TurnViewWithDate({turnObject: props});

            expect( rendered.isToday() ).toBe(false);
        });

        it('Returns true if the day is correct', () => {
            const props = {
                day     : today.day,
                month   : today.month,
                year    : today.year,
                turn    : 'M',
                weekday : 2
            }
            const rendered = new TurnViewWithDate({turnObject: props});

            expect( rendered.isToday() ).toBe(true);
        });
    });

    describe('Is weekend method', () => {
        it('Returns false it the day is not weekend', () => {
            const props = {
                day     : 1,
                month   : 1,
                year    : 2019,
                turn    : 'M',
                weekday : 2
            }
            const rendered = new TurnViewWithDate({turnObject: props});

            expect( rendered.isWeekend() ).toBe(false);
        });

        it('Returns true it the day is weekend', () => {
            const props = {
                day     : 1,
                month   : 1,
                year    : 2019,
                turn    : 'M',
                weekday : 6
            }
            const rendered = new TurnViewWithDate({turnObject: props});

            expect( rendered.isWeekend() ).toBe(true);
        });
    });
});




