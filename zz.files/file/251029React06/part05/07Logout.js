
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoginUserContext from '../../contexts/LoginUserContext';

const Logout = () => {

  console.log('Logout component loaded');

  //=> 전역 Data [LoginUserContext] 사용위해 useContext Hook 사용.
  // 구조부분할 할당 : login, setChangeLogin 중 setChangeLogin 만 사용.
  // const { login, setChangeLogin , loginCheckOK } = useContext(LoginUserContext);
  const { setChangeLogin } = useContext(LoginUserContext);
  console.log(setChangeLogin)

  //==> 로그아웃 후 화면 이동을 위한 history 객체 받기 
  const history = useHistory();

  const logout = () => {

    console.log("Logout arrow function");

    //=> client 로그아웃 처리 
    // const { setChangeLogin } = useContext(LoginUserContext)
    // 에서 받은 상위 Component 의 state  login = null 변경.
    setChangeLogin( null );

    //=> server 로그아웃 처리 : 
    axios.post('http://127.0.0.1:8080/user/json/logout',
                {},
                { // 중요, 중요, 이 설정이 있어야만 cookie가 전송됨.
                  withCredentials: true,
                } 
              );
    //=> 로그아웃 후 이동할 화면 지정.
    history.push('/');
  };

  return (
    <div className="container py-4 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={logout}>
          Logout
        </button>
    </div>
  );
};

export default Logout;