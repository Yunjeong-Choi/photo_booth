import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { v4 as uuid4 } from "uuid";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultButton from "../components/DefaultButton";
import PhotoFrame from "../components/PhotoFrame";
import MadeBy from "../components/MadeBy";

const Print = () => {
  const navigate = useNavigate();
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const { state } = useLocation() as { state?: { imagesInFrame?: string[] } };

  if (!state || !state.imagesInFrame) {
    return null;
  }

  const printDiv = () => {
    window.print();

    // // 인쇄할 부분 추출
    // const html = document.querySelector("html");
    // const printSection = document.querySelector(".print-element")?.outerHTML;

    // // 인쇄용 div 생성
    // const printDiv = document.createElement("div");
    // printDiv.id = "page";
    // printDiv.style.width = "100vw";
    // printDiv.style.height = "100vh";
    // printDiv.style.backgroundColor = "black";
    // html?.appendChild(printDiv);

    // // 인쇄용 div에 내용 넣기
    // if (printSection) {
    //   printDiv.innerHTML = printSection;
    // }

    // // 인쇄시작
    // printDiv.style.display = "block";
    // document.body.style.display = "none";

    // setTimeout(() => {
    //   window.print();
    // }, 1000);

    // window.onafterprint = () => {
    //   document.body.style.display = "block";
    //   printDiv.style.display = "none";
    //   navigate("/end");
    // };
  };

  const saveDiv = () => {
    const saveTarget = photoFrameRef.current;

    if (saveTarget) {
      html2canvas(saveTarget).then(function (canvas) {
        const img = document.createElement("a");
        img.download = `욱경네컷-${uuid4()}.png`;
        img.href = canvas.toDataURL();
        document.body.appendChild(img);
        img.click();
      });
    }

    navigate("/end");
  };

  return (
    <StyledContainer>
      <PhotoFrame
        photoFrameRef={photoFrameRef}
        className={"print-element"}
        imageList={state.imagesInFrame}
      />
      <NoticeSection>
        {/* <SectionTitle>프린트 하기</SectionTitle>
        <Notice>
          {`① 아래 "프린트" 버튼을 누르고,
            ② [소장용 N장] + [편지용 추가 1장] 설정
            ③ 오른쪽 상단의 "프린트" 버튼 클릭하면 끝!`}
        </Notice>
        <PrintButton handleClickButton={printDiv}>프린트</PrintButton> */}
        <SectionTitle>프린트 하기</SectionTitle>
        <Notice>
          {`① 아래 "저장" 버튼을 누르고,
            ② 진행요원에게 아이패드를 주시면
            ③ 프린트 해드려요!`}
        </Notice>
        <PrintButton handleClickButton={saveDiv}>
          <span>내 마음 속에</span>⌜저장⌟
        </PrintButton>
      </NoticeSection>
      <MadeBy />
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerWithBackground)`
  gap: 6rem;
`;

const NoticeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SectionTitle = styled.div`
  font-size: 5rem;
  font-weight: 800;
`;

const Notice = styled.p`
  width: 100%;
  font-size: 3rem;
  white-space: pre-line;
  line-height: 150%;
  text-align: left;
`;

const PrintButton = styled(DefaultButton)`
  width: 36rem;
  height: 6rem;
  /* margin-bottom: 3rem; */

  > span {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    color: black;
  }
`;

const SaveButton = styled(PrintButton)`
  background: linear-gradient(180deg, #f5a17a 0%, #f64847 100%);
  margin-bottom: 0;
`;

export default Print;
