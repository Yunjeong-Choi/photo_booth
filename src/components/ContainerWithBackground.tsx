import styled from "styled-components";
import background from "../assets/img_photo_booth_background.svg";

interface ContainerWithBackgroundProps {
  className?: string;
  children: React.ReactNode;
}

const ContainerWithBackground = (props: ContainerWithBackgroundProps) => {
  return <Container className={props.className}>{props.children}</Container>;
};

const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: center / contain no-repeat url(${background}), black;

  text-align: center;
`;

export default ContainerWithBackground;
