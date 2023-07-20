import { Outlet } from "react-router-dom";

function Event() {
  return (
    <>
      <div>
        <h1>오늘의 이벤트는 뭘까용?</h1>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Event;
