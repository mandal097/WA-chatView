import { toast } from 'react-toastify';
import axios from '../../../../config/axios';

const updateFunc = async (data, groupId) => {
    console.log(data);
    try {
        const res = await axios.put(`/groups/update/${groupId}`, data, {
            headers: {
                token: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (res.data.status === 'err') {
            toast.error(res.data.message);
        }
        if (res.data.status === 'success') {
            toast.success(res.data.message);
            return res.data
        }
    } catch (error) {
        toast.error('Something went wrong');
    }
}

export default updateFunc