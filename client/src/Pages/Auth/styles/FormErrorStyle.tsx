import { FormContainer } from "@/Components";
import styled, { css, keyframes } from "styled-components";

interface StyledLabelProps {
  isError: boolean | null;
}

export const shake = keyframes`
  10%,
  90% {
    visibility: visible;
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const errorAnimation = css`
  animation: ${shake} 0.65s linear 0.15s;
`;

export const ErrorLabel = styled(({ isError, ...parentsProps }) => (
  <FormContainer.Label {...parentsProps} />
))<StyledLabelProps>`
  ${({ theme }) => theme.mixin.label(theme)};
  ${({ isError }) => {
    if (isError === null) {
      return css`
        visibility: hidden;
      `;
    }

    if (!isError) {
      return css`
        visibility: visible;
        color: #ff0000;
        ${errorAnimation}
      `;
    } else {
      return css`
        visibility: hidden;
        color: #ffffff;
      `;
    }
  }}
`;
