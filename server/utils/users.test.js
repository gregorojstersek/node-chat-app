const expect = require('expect');

const {
    Users
} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Gregor',
            room: 'Node Course'
        }, {
            id: '3',
            name: 'Tadej',
            room: 'React Course'
        }]
    })

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Gregor',
            room: 'The Office Fans'
        };
        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const userId = '1';
        const user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        const userId = '99';
        const user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const userId = '2';
        const user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        const userId = '99';
        const user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it('should return names for node course', () => {
        const userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Gregor']);
    });

    it('should return names for react course', () => {
        const userList = users.getUserList('React Course');

        expect(userList).toEqual(['Tadej']);
    });
});