import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultButton from "../components/DefaultButton";
import MadeBy from "../components/MadeBy";

function Home() {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/Camera");
  };

  return (
    <StyledContainer>
      <From>FROM. 욱엽&해경</From>
      <Title>
        <span>인생네컷</span>을 선물합니다
      </Title>
      <Message>{`오늘 와주셔서 감사합니다!
      여러분에게도 즐거운 하루가 되길 바라며
      인생네컷을 준비했습니다.

      총 6번 사진을 찍은 후
      4장의 사진을 골라주세요`}</Message>
      <NextButton handleClickButton={handleClickButton}>시작하기</NextButton>
      <MadeBy />
    </StyledContainer>
  );
}

const StyledContainer = styled(ContainerWithBackground)`
  flex-direction: column;
`;

const From = styled.p`
  font-size: 3rem;
`;

const Title = styled.p`
  margin-top: 2.7rem;
  font-size: 5rem;

  > span {
    font-size: 5rem;
    font-weight: 700;
  }
`;

const Message = styled.p`
  margin-top: 8rem;
  font-size: 3rem;
  white-space: pre-line;
`;

const NextButton = styled(DefaultButton)`
  width: 39.5rem;
  height: 7.5rem;
  margin-top: 8rem;
`;

export default Home;
