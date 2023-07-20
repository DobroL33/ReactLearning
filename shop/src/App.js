import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Container, Navbar, Row, Col } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./Detail";
import NotFound from "./Routes/NotFound";
import About from "./Routes/About.js";
import Event from "./Routes/Event";
import First from "./Routes/Event/first";
import Second from "./Routes/Event/second";
import axios from "axios";

// Vue 와는 다르게 이미지도 경로 바탕으로 import 해주고 backgroundImage: url(할당 경로) 써줘야함

// 부트스트랩을 import해도 되고, public/index.html 에 직접 link로 넣어도 됨
// array 자료형  let a = ['Lee', '26]
// object 자료형 let b = {name : 'Lee', age : 26} 이런식으로 해줘야함
// array를 쓸 때는 a[0],a[1] / object를 쓸 땐 b.name, b.age
// 섞어 쓴다면? a[0].name ? 이렇게 쓰면 될까? => 맞다 !

function App() {
  let [dogs, getDogs] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(1);
  // use 어쩌구는 Hook이다 = 유용한 것들이 들어있는 함수
  // navigate는 페이지 이동을 도움

  // style={{ backgroundImage: "url(" + 이미지 + ")" }}
  // 이미지 경로는 public에 넣어놓고 하면 편한데, 하위 경로 ex) dobroL33.com/customer 이렇게 들어가버리면 작동 잘 안함.
  // 그래서 이거 해결하기 위해 {process.env.PUBLIC_URL + 'bg.jpg'} 이렇게 공통 경로를 default 설정 만들어줘야함
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            PET & MET
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
                // navigate(1) 이면 앞으로가기, -1이면 뒤로가기 실제 앞,뒤가기 버튼이랑 같음
              }}
            >
              홈으로 이동
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/Detail");
              }}
            >
              디테일입니당
            </Nav.Link>

            {/* <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로 가기 버튼
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(1);
              }}
            >
              앞으로 가기 버튼
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Row>
                {dogs.map(function (title, nums) {
                  return <Card dogs={dogs} number={nums}></Card>;
                })}
              </Row>
            </div>
          }
        />
        <Route path="/detail/:nums" element={<Detail dogs={dogs} />} />

        {/* <Route path="*" element={<NotFound></NotFound>}></Route>

        {/* Route 안에 NestRoute를 사용하려면 구멍이 필요한데
        이 구멍이 OutLet 이다. OutLet에서 보여지는데 App 내부에서 쓴다면 걍 임포트
        외부 디렉토리에 있는 큰 Route를 쓸거면 그 안에서 OutLet을 임포트 해줘야함 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버인데용</div>}></Route>
          <Route path="location" element={<div>위치 정보용</div>}></Route>
        </Route>
        {/* <Route path="/Event" element={<Event />}>
          <Route path="first" element={<First />}></Route>
          <Route path="second" element={<Second />}></Route>
        </Route> */}
      </Routes>
      <button
        onClick={() => {
          // setCount(count + 1);
          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((result) => {
              let copy = [...dogs, ...result.data];
              getDogs(copy);
            });
          // 두개 다 요청하고 성공했을 때 then 으로 넘어가주세요 라는 약속
          Promise.all([
            axios.post("sagadd", { name: "kim" }),
            axios.post("sagadd", { name: "lee" }),
          ]).then(() => {});
        }}
      >
        더보기 버튼
      </button>
      <br />
    </div>
  );
}
function Card(props) {
  return (
    <Col sm>
      <img src={props.dogs[props.number].img} width="80%" alt="" />
      <h4>{props.dogs[props.number].title}</h4>
      <p>{props.dogs[props.number].content}</p>
    </Col>
  );
}

export default App;
