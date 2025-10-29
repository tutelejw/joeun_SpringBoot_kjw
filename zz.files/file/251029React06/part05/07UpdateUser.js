// props : user, onChange, onSubmit 의 props를 받아서 사용합니다.
// 구조분해 할당을 통해 props를 사용합니다.
const UpdateUser = ( { user, onChange, onSubmit }) => {

  console.log('UpdateUser component loaded');


  return (


    <div className="container py-5 d-flex justify-content-center">

      <form className="card shadow-sm p-4" style={{minWidth: 360, maxWidth: 520}} onSubmit={onSubmit}>
        <h4 className="mb-3 text-center">회원정보 수정</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">아이디</label>
            <input type="text" name="userId" className="form-control" value={user.userId} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">이름</label>
            <input type="text" name="userName" className="form-control" value={user.userName} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">비밀번호</label>
            <input type="password" name="password" className="form-control" value={user.password} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">이메일</label>
            <input type="email" name="email" className="form-control" value={user.email} onChange={onChange} />
          </div>
          <div className="col-12">
            <label className="form-label">주소</label>
            <input type="text" name="addr" className="form-control" value={user.addr} onChange={onChange} />
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">정보수정완료</button>
          </div>
        </div>
      </form>

    </div>

  );
};

export default UpdateUser;




