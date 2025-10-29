
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import LoginUserContext from "../../contexts/LoginUserContext";

////////////////////////////////////////////////
//import Logout from "../login/02Logout";
import Logout from "../login/07Logout";

const Header = () => {

  console.log('Header component loaded');

  // 구조부분할 할당 : login, setChangeLogin , loginCheckOK 중 
  // login, loginCheckOK 만 사용.
  // const { login, setChangeLogin , loginCheckOK } = useContext(LoginUserContext);
  const { login , loginCheckOK } = useContext(LoginUserContext);
  console.log( login , loginCheckOK );

  // 로그인 유무에 따라 화면 구성 
  // LgoinManger.js useEffect() 에서 로그인 유무 확인 후 
  // loginCheckOK 값이 true 일때만 화면 구성.
  if( loginCheckOK === false )  return null;
  //////////////////////////////////////////////////


  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">Main</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav07">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav07">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/user">UserPage</Link>
            </li>
            <li className="nav-item">
              { !login?.userId ? (
                <Link className="btn btn-sm btn-outline-primary" to="/login">LoginPage</Link>
              ) : (
                <Logout/>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  );
};

export default Header;