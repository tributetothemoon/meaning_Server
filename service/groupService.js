/* eslint-disable no-useless-catch */
const { Group, Member } = require('../models');

module.exports = {
  createGroup: async (groupName, maximumMemberNumber, introduction) => {
    try {
      const makeGroup = await Group.create({
        groupName,
        maximumMemberNumber,
        introduction,
      });
      return makeGroup;
    } catch (err) {
      throw err;
    }
  },
  checkMemberId: async (id) => {
    try {
      const findMemberId = await Member.findOne({
        where: {
          UserId: id,
        },
      });
      return findMemberId;
    } catch (err) {
      throw err;
    }
  },
  createMember: async (id, groupId, isHost) => {
    try {
      const makeMember = await Member.create({
        isHost,
        UserId: id,
        GroupId: groupId,
      });
      return makeMember;
    } catch (err) {
      throw err;
    }
  },
};
