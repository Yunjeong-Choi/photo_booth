import styled from "styled-components";

interface DefaultButtonProps {
  className?: string;
  children: React.ReactNode;
  handleClickButton: () => void;
}

const DefaultButton = (props: DefaultButtonProps) => {
  return (
    <Button className={props.className} onClick={props.handleClickButton}>
      {props.children}
    </Button>
  );
};

const Button = styled.button`
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

export default DefaultButton;
