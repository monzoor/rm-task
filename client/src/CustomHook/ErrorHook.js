import { useSelector } from 'react-redux';

const useError = ({ from, inline }) =>
    useSelector(state => {
        if (state.errors.from === from) {
            if (inline) return state.errors.messages;
            return true;
        }
        return null;
    });

export default useError;
