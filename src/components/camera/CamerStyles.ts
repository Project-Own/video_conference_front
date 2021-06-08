import styled, { css, keyframes } from "styled-components";
const flashAnimation = keyframes`
  from{
    opacity: 0.75;
  }
  to {
    opacity: 0;
  }
`;

export const Video = styled.video`
  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const Flash = styled.div<{ flash: boolean }>`
  opacity: 0;

  ${({ flash }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;
