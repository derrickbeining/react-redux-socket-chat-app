

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

export const gotMessagesFromServer = function (messages) {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        Messages: messages
    };
};