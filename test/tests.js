const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised).should();
const User = require('../models/users');
const Setup = require('../models/setup');

describe('Users model tests', () => {
    // given an email eaddress, do we get a user object in return
    it('should be a valid user object', async () => {
        const userInstance = new User(null, null, null, 'ez@aol.com', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("the user is", theUser);
        expect(theUser).to.be.an('object');
    });

    it('should NOT be undefined', async () => {
        const userInstance = new User(null, null, null, 'ez@aol.com', null);
        const theUser = await userInstance.getUserByEmail();
        expect(theUser.id).to.not.be.an('undefined');
    });

    it('should get a list of all users', async () => {
        const allUsers = await User.getAllUsers();
        expect(allUsers).to.not.be.an('undefined');
    });
});

describe('Setup model tests', () => {
    it('should be an object', async () => {
        const test = await Setup.budgetExists(1);
        expect(test).to.be.an('object');
    })
});