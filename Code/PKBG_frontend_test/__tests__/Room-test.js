/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Room from '../Component/Room';

import WS from 'jest-websocket-mock';
//global.WebSocket = WebSocket;
/*
describe('app', () => {
    it('connect websockets response', (done) => {
                const ws = new WebSocket(`ws://localhost:8080`)
            .on('message',(msg) => {
                expect(JSON.parse(msg).code).toEqual(0);
                ws.close();
            })
            .on('close',() => done());
    });
});
*/
const server = new WS('ws://localhost:1234/');

const ws = new WebSocket('ws://localhost:1234/');


test('renders correctly', () => {

ws.send(JSON.stringify({code : 0 , roomID : '114514'}));
ws.send(JSON.stringify({code : 1 , username : 'nmsl'}));
ws.send(JSON.stringify({code : 2 , username : 'nmsl'}));
ws.send(JSON.stringify({code : 3 , username : 'nmsl'}));
ws.send(JSON.stringify({code : 4 , username : 'nmsl'}));
ws.send(JSON.stringify({code : 5 , username : 'nmsl'}));
ws.send(JSON.stringify({code : 6 , username : 'nmsl'}));
server.send(JSON.stringify({code : 0 }));
    const n = {
        state : {
            params : {
                username : 'aaa',
                roomID : '114514',
                password : '4396',
                host : true
            }
        }
    }

  const tree = renderer.create(<Room navigation={n}  />).toJSON();
  expect(tree).toMatchSnapshot();
});
/*
import React from 'react';
import Intro from '../Intro';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});*/
