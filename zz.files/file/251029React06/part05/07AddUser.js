
// props : onChange, onSubmit 의 props를 받아서 사용합니다.
// 구조분해 할당을 통해 props를 사용합니다.
const AddUser = ( {onChange , onSubmit} ) => {

  console.log('AddUser component loaded');


  return (
  
    <div className="ViewGood">
      <div className="container py-5 d-flex justify-content-center">
        <form className="card shadow-sm p-4" style={{minWidth: 360, maxWidth: 520}} onSubmit={onSubmit}>
          <h4 className="mb-3 text-center">회원가입</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">아이디</label>
              <input type="text" name="userId" className="form-control" onChange={onChange} placeholder="아이디" />
            </div>
            <div className="col-md-6">
              <label className="form-label">이름</label>
              <input type="text" name="userName" className="form-control" onChange={onChange} placeholder="이름" />
            </div>
            <div className="col-md-6">
              <label className="form-label">비밀번호</label>
              <input type="password" name="password" className="form-control" onChange={onChange} placeholder="비밀번호" />
            </div>
            <div className="col-md-6">
              <label className="form-label">이메일</label>
              <input type="email" name="email" className="form-control" onChange={onChange} placeholder="메일" />
            </div>
            <div className="col-12">
              <label className="form-label">주소</label>
              <input type="text" name="addr" className="form-control" onChange={onChange} placeholder="주소" />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">회원가입하기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;