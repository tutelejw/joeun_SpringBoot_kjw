
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useContext } from "react";
import LoginUserContext from "../../contexts/LoginUserContext";

const LoginFrom = () => {

  console.log('LoginForm component loaded');

  //=> 전역 Data [LoginUserContext] 사용위해 useContext Hook 사용.
  // 구조분해 할당 : login, setChangeLogin,loginCheckOK중 setChangeLogin 만 사용.
  const { setChangeLogin } = useContext(LoginUserContext);
  console.log(setChangeLogin)

  //==> 로그인 후 화면 이동을 위한 history 객체 받기 
  let history = useHistory();

  //==> login 수행 : Server 에 Ajax 이용. Data 요청 및 처리
  //==> 중요, 중요 : e : event 객체 / event 객체를 이용 value 값 가져오기.
  const handleSubmit = async (e) => {

    // submit 이벤트는 기본적으로 페이지를 새로고침 함.
    // e.preventDefault()를 사용하여 기본 동작을 막음.
    e.preventDefault();
    
    //event 객체를 통해 value 값 가져오기. 
    let userId = e.target.userId.value;
    let password = e.target.password.value; 

    console.log("확인 userId, password ==> ", userId, password);

    await login(userId, password);

  };


  const login = async (userId, password) =>{

    console.log("Login arrow function");
    
    axios.post('http://127.0.0.1:8080/user/json/login',
                { 
                  userId:userId, 
                  password:password
                },
                { // 중요, 중요, 이 설정이 있어야만 cookie가 전송됨.
                  withCredentials: true,
                } 
              )
         .then( (response) => {
                  //==> response 객체중 JSON 추출.
                  console.log(response.data);

                  //==> 로그온시 main 화면으로, 미 로그인시 다시 로그인 알림.
                  if(response.data){
                    //=> 로그인 정보 갖는 상위 state login 변경
                    setChangeLogin( response.data.userId );
                    history.push('/');
                  }else{
                    alert("아이디 , 패스워드를 확인하시고 다시 로그인...");
                  }
              }
          );
  }


  return (

      <div className="container py-5 d-flex justify-content-center">

        <form className="card shadow-sm p-4" style={{minWidth: 320, maxWidth: 420}} onSubmit={handleSubmit}>
          <h4 className="mb-3 text-center">로그인</h4>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input type="text" id="userId" name="userId" className="form-control" placeholder="userId" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-control" placeholder="password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">로그인</button>
        </form>
        
      </div>

  );
};

export default LoginFrom;