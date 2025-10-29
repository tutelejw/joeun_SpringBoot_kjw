// props : user 의 props를 받아서 사용합니다.
// 구조분해 할당을 통해 props를 사용합니다.
const UserListItem = ({ user }) => {

  console.log('UserListItem component loaded');

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <div className="fw-bold">{user.userId}</div>
        <small className="text-muted">{user.userName} · {user.email}</small>
      </div>
      <span className="badge bg-light text-dark">{user.addr || '주소 없음'}</span>
    </li>
  );
};

export default UserListItem;