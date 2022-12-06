import { Link } from "react-router-dom";
import styled from "styled-components";

interface DefaultLinkButtonProps {
  className?: string;
  children: React.ReactNode;
  destinationPath: string;
  linkState?: any;
}

const DefaultLinkButton = (props: DefaultLinkButtonProps) => {
  return (
    <StyledLink
      className={props.className}
      to={props.destinationPath}
      state={props.linkState}
    >
      {props.children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, #f5e37e 0%, #f6b847 100%);
  border-radius: 3rem;

  color: black;
  font-size: 2.2rem;
  font-weight: 700;
  text-decoration: none;
`;

export default DefaultLinkButton;
