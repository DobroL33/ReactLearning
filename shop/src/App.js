import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Container, Navbar, Row, Col } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link } from "react-router-dom";
// Vue 와는 다르게 이미지도 경로 바탕으로 import 해주고 backgroundImage: url(할당 경로) 써줘야함

// 부트스트랩을 import해도 되고, public/index.html 에 직접 link로 넣어도 됨
// array 자료형  let a = ['Lee', '26]
// object 자료형 let b = {name : 'Lee', age : 26} 이런식으로 해줘야함
// array를 쓸 때는 a[0],a[1] / object를 쓸 땐 b.name, b.age
// 섞어 쓴다면? a[0].name ? 이렇게 쓰면 될까? => 맞다 !

function App() {
  let [dogs] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">PET & MET</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Mypage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div

      // style={{ backgroundImage: "url(" + 이미지 + ")" }}
      // 이미지 경로는 public에 넣어놓고 하면 편한데, 하위 경로 ex) dobroL33.com/customer 이렇게 들어가버리면 작동 잘 안함.
      // 그래서 이거 해결하기 위해 {process.env.PUBLIC_URL + 'bg.jpg'} 이렇게 공통 경로를 default 설정 만들어줘야함
      >
        <Row>
          {dogs.map(function (title, nums) {
            return <Card dogs={dogs} number={nums}></Card>;
          })}
        </Row>
      </div>
      <br />
      <Button variant="info">Info</Button>
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
