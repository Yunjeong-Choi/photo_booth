import styled from "styled-components";
import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultLinkButton from "../components/DefaultLinkButton";

function Home() {
  return (
    <StyledContainer>
      <From>FROM. 욱엽&해경</From>
      <Title>인생네컷을 선물합니다</Title>
      <Message>{`오늘 와주셔서 감사합니다!
      여러분에게도 즐거운 하루가 되길 바라며
      인생네컷을 준비했습니다.

      총 6번 사진을 찍은 후
      4장의 사진을 골라주세요`}</Message>
      <NextButton destinationPath="/Camera">시작하기</NextButton>
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
`;

const Message = styled.p`
  margin-top: 8rem;
  font-size: 3rem;
  white-space: pre-line;
`;

const NextButton = styled(DefaultLinkButton)`
  width: 39.5rem;
  height: 7.5rem;
  margin-top: 8rem;
`;

export default Home;
