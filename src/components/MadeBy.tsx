import styled from "styled-components";

const MadeBy = () => {
  return (
    <Container>
      {`Developed By 신부친구 `}
      <span>최윤정, 김승연</span>
      {/* {`개발 문의 : yunjeong.dev.2173@gmail.com / winkitee@gmail.com`} */}
    </Container>
  );
};

const Container = styled.p`
  position: absolute;
  bottom: 1rem;

  margin-left: auto;
  margin-right: auto;

  text-align: right;
  font-size: 1.5rem;
  white-space: pre-line;

  > span {
    font-size: 1.5rem;
    font-weight: 800;
  }
`;

export default MadeBy;
