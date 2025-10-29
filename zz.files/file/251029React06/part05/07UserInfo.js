
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// props : user 의 props를 받아서 사용합니다.
// 구조분해할당 통해 props를 사용합니다.
const UserInfo = ({ user }) => {

  console.log('UserInfo component loaded');
  console.log(user);

  return (

    <div className="container py-4">

      <div className="card shadow-sm">
        <div className="card-header">내 정보</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6"><strong>아이디</strong>: {user.userId}</div>
            <div className="col-md-6"><strong>이름</strong>: {user.userName}</div>
            <div className="col-md-6"><strong>주소</strong>: {user.addr}</div>
            <div className="col-md-6"><strong>전화번호</strong>: {user.phone ? user.phone : '전화번호 없음'}</div>
            <div className="col-md-6"><strong>email</strong>: {user.email}</div>
            <div className="col-md-6"><strong>등록일</strong>: {user.regDateString}</div>
          </div>
        </div>
      </div>
      
    </div>


  );
};

export default UserInfo;