import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 여기에만 적용되는 css를 따로 만들고 싶다면 같은 경로안에 Detail.module.css 를 만들고 import
// 그렇지 않으면 전역으로 App.css 의 영향을 받을 수 있음. 반대로 App.css에만 적용되는걸 하려면 아래처럼 ㄱ
// 상위 컴포넌트에서 주는 값으로 색이나 파라미터를 바꾸고 싶다면 props를 뚫어줌. 걍 외워야함 이건
let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

//   useEffect(() => {
//     for (var i = 0; i < 10000; i++) {
//       console.log(1);
//     }
//   });
// 위에 useEffect는 모든 javaScript, html을 다 렌더링한 후 시행되는 녀석임.
// 그래서 시간이 오래걸리는 작업이면 걍 얘 돌려놓고, 혹은 렌더링이 다 된 후에 값을 받을거라면
// 그렇게 받아야만 하는 값을 바탕으로 식을 쓰고 싶다면 useEffect를 사용하면 된다.
// 혹은 서버에서 데이터 가져오는 작업(HTML이 먼저 보이는게 더 중요하니까 ! ), 아니면 타이머 장착

// 컴포넌트 마운트시 1회만 실행하고 싶으면 useEffect 시간 설정 후 dependency를 []로만 설정
// useEffect(()=>{
//     return ()=>{
//       실행할코드
//     }
//   })
//   이러면 useEffect 안의 코드 실행 전에 항상 실행됩니다.

//   useEffect(()=>{
//     return ()=>{
//       실행할코드
//     }
//   }, [])
//   이러면 컴포넌트 unmount시 1회 실행됩니다.
// useEffect(()=>{
//     실행할코드
//   }, [state1])
//   이러면 state1이 변경될 때만 실행됩니다.
// isNaN()  괄호안에 넣으면 boolean 형태로 반환해줌. if 문 넣고 돌리면 T or F 로 알려줄거임.

function Detail(props) {
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let { nums } = useParams();
  let [num, setNum] = useState(""); // 비워둬야 입력값 받지.

  let findOne = props.dogs.find(function (x) {
    return x.id == nums;
  });

  //   useEffect(() => {
  //     let a = setTimeout(() => {
  //       setAlert(false);
  //     }, 2000);
  //     return () => {
  //       // 여기는 useEffect가 동작전에 실행되는 함수. 우선시 되는 녀석을 넣어주자 혹은 cleanup 함수
  //       // 서버에 요청같은거 보낼 때, 완료되면 이전 요청 없애버리기( 안하면 계속 요청이 쌓일거임 받기도전에)
  //       // 실행하기 전에 clear 먼저 하니까 쌓일 일이 없다 ! 그래서 socket연결 요청 없애기, ajax요청 중단할때도 많이 쓰인다
  //       clearTimeout(a);
  //     };
  //   }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      setAlert(false);
    } else {
      setAlert(true);
    }
  }, [num]);

  return (
    <div className="container">
      <YellowBtn
        bg="blue"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </YellowBtn>
      {count}
      {alert == true ? <div>2초내로 사라고</div> : null}

      {/*
      숫자 입력받고, 아니면 띄우기 */}
      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />

      <div className="row">
        <div className="col-md-6">
          <img src={findOne.img} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findOne.title}</h4>
          <p>{findOne.content}</p>
          <p>{findOne.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
