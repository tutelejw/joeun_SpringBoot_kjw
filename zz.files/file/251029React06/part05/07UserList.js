//////////////////////////////////////////////
//import UserListItem from "./06UserListItem";
import UserListItem from "./07UserListItem";

// props : users 의 props를 받아서 사용합니다.
// 구조분해 할당을 통해 props를 사용합니다.
const UserList = ( {users} ) => {

  console.log('UserList component loaded');
  console.log(users);


  return (

    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>회 원 목 록 보 기</span>
          <div className="input-group" style={{maxWidth: 280}}>
            <input className="form-control" placeholder="검색어" />
            <button className="btn btn-outline-primary">검색</button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {Array.isArray(users) && users.map((user, idx) => (
            <UserListItem key={idx} user={user} />
          ))}
        </ul>
      </div>
    </div>

  );
};

export default UserList;