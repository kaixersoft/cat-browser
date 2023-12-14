import { Container } from "react-bootstrap";
import styled from "styled-components";
import { ChildrenProps } from "../types/children";

export const Layout = styled(Container)`
  &&& {
    padding: 20px;
  }
`;

export default function PageLayout({ children }: ChildrenProps) {
  return <Layout>{children}</Layout>;
}
