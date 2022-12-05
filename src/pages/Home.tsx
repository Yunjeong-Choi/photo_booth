import styled from "styled-components";
import { Link } from "react-router-dom";
import ContainerWithBackground from "../components/ContainerWithBackground";

function Home() {
  return (
    <ContainerWithBackground>
      <From>FROM. 욱엽&해경</From>
      <Title>인생네컷을 선물합니다</Title>
      <Message>{`오늘 와주셔서 감사합니다!
      여러분에게도 즐거운 하루가 되길 바라며
      인생네컷을 준비했습니다.

      총 6번 사진을 찍은 후
      4장의 사진을 골라주세요`}</Message>
      <StyledLink to="/Camera">시작하기</StyledLink>
    </ContainerWithBackground>
  );
}

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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 39.5rem;
  height: 7.5rem;
  margin-top: 8rem;

  background: linear-gradient(180deg, #f5e37e 0%, #f6b847 100%);
  border-radius: 3rem;

  color: black;
  font-size: 2.2rem;
  font-weight: 700;
  text-decoration: none;
`;

export default Home;
