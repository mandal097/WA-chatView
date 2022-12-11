import axios from "../config/axios";

export const groupActivityLogs = async (groupId, title) => {
    await axios.post('/groups/activities', {
        groupId,
        title
    }, {
        headers: {
            token: `bearer ${localStorage.getItem('token')}`
        },
    });
}