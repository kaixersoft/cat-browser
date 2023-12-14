import { Badge } from "react-bootstrap";
import styled from "styled-components";

export const StyleDiv = styled.div`
  color: palevioletred;
  font-size: 2em;
`;

export const BigBadge = styled(Badge)`
  &&& {
    background-color: #17a2b8;
    font-size: 1.5em;
  }
`;
