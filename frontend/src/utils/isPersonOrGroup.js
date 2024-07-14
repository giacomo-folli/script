/**
 *
 * @param {Chat} conversation
 * @param {User} authUser
 * @returns parsed item with fields {fullName, profilePic}
 */
export const isPersonOrGroup = (conversation, authUser) => {
  if (conversation.isGroup)
    return {
      fullName: conversation.groupName || "",
      profilePic: conversation.groupImage || "",
      isGroup: true,
    };
  else
    return conversation.participants.filter(
      (user) => user._id !== authUser._id
    )[0];
};
