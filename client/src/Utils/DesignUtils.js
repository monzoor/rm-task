import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
        `;
const FadeInAnimation = styled.div`
    animation: ${fadeIn} 1s;
`;
const test = styled.div`
    transition: all 0.5s;
`;

export { FadeInAnimation, test };
