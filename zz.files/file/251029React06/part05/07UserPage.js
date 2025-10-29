import { useState } from 'react';

////////////////////////////////////////////////////
// userService.~~ 형식으로 사용가능 : 사용법 1>
import userService from '../services/userService';
////////////////////////////////////////////////////

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

/////////////////////////////////////////////////////
//import AddUser from '../components/user/04AddUser';
import AddUser from '../components/user/07AddUser';
/////////////////////////////////////////////////////
//import UpdateUser from '../components/user/05UpdateUser'
import UpdateUser from '../components/user/07UpdateUser'
/////////////////////////////////////////////////////
//import UserList from '../components/user/06UserList';
import UserList from '../components/user/07UserList';
/////////////////////////////////////////////////////

import { useEffect, useContext } from 'react';
import LoginUserContext from '../contexts/LoginUserContext';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

/////////////////////////////////////////////////////
//import UserInfo from '../components/user/03UserInfo';
import UserInfo from '../components/user/07UserInfo';

import { Link, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

/*
  - Model 2 Web Arch. => MVC + 2 Layer Arch.
  - Presentation Layer =>  Controller + View
  - Controller
    : B/L 수행 , M/V 연결 , Navigation , 공통, 선처리(예>로그인 관리 등등)

  - UserPage.js  ==> UserController.java 고려하자.
  1. 공통처리 : 로그인 관리 
  2. B/L 수행 : userService.js 이용 각 함수 호출
  3. M/V 연결 : props 로 Presentaion Component(UI)전달
  4. Navigation : push() 및 화면 구성함.
*/

const UserPage = () => {

  console.log('UserPage Container component loaded');

  /////////////////////////////////////////////////////////////
  // 0. 로그인 관리, Navigation , Model / View 연결 

  //0.1 location.pathname : 현재 URL의 경로를 반환함.
  const { pathname } = useLocation()

  //0.2 화면 이동을 위한 history 객체
  let history = useHistory();

  //0.3 로그인 유무 판단단
  const { login , loginCheckOK } = useContext(LoginUserContext);
  console.log( pathname, login , loginCheckOK );

  // 0.4 Model 정보 state 
  // 0.4.1 사용자 정보 state
  // com.model2.mvc.service.domain.User 참조 
  const [user, setUser] = useState({
    userId: "",
    userName : "",
    password : "",
    role : "",
    ssn : "",
    phone : "",
    addr : "",
    email : "",
    regDate : "",
    phone1 : "",
    phone2 : "",
    phone3 : "",
    regDateString : ""
  });
  // 0.4.2 사용자목록 정보 state
  const [users, setUsers] = useState([]);
  ////////////////////////////////////////////////


  //////////////////////////////////////////////////////////
  // 1. 회원가입 Container 컴포넌트 + Presentation 컴포넌트 분리 구현
  //////////////////////////////////////////////////////////
  
  // 1.1 회원 가입 : 구현
  // 1.1.1 사용자 정보입력시 입력정보 user 로 저장하는 이벤트처리(핸들러)
  const handleChange = (e) => {

    //구조분할 할당을 사용하여 이벤트 객체에서 name과 value를 추출합니다.
    const { name, value } = e.target;
    //const name = e.target.name; // name 속성값을 가져옵니다.
    //const value = e.target.value; // value 속성값을 가져옵니다.
    
    //setUser 함수를 사용하여 user 상태를 업데이트
    //==> : 아래의 사용법 매우 유용함. : 중요.중요.중요.
    setUser({
      ...user,
      [name]: value
    });

  };

  // 1.1.2 사용자 정보입력후 가입 이벤트처리(핸들러)
  const handleSubmit = async (e) => {

    //폼 제출 시 페이지가 새로 고침되는 것을 방지합니다.
    e.preventDefault();

    try {
    
      // API 호출을 모듈화한 userService를 사용 사용자정보를 추가합니다.
      const addedUser = await userService.addUser(user);
    
      // 회원가입 OK
      if (addedUser == true) {
        alert('회원가입 성공!');
        // 회원가입 후 로드인으로...
        history.push('/login');
      } else {
        alert('회원가입 실패: 서버에서 null 반환');
      }
      
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 실패');
    }
  };

  // 1.2 로그인 회원 내정보 보기 : URI /user
  //- 렌더링시 1번만 호출되도록 구현 한 useEffect() 사용
  useEffect(() => {

    const fetchUser = async () => {
      try {
        //React Front-End용 로그인/회원 관련 API 호출 모듈
        //src/services/userService.js 사용
        const userData = await userService.getUser(login.userId); 
        setUser(userData);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };

    //==> 로그인 회원만.. 호출. //==> truthy / falsy
    if( login.userId ){
      //==> useEffect() 은 async 사용 불가 : fetchUser() 사용함.
      fetchUser();
    }

  }, []); //==> 1회 호출


  // 1.3 로그인 회원 내정보 수정  
  // : 로그인한 회원 /user/updateUser 로 오면 05UpdateUser.js 로이동 수정한다.
    const handleSubmitUpdate = async (e) => {
      
      //폼 제출 시 페이지가 새로 고침되는 것을 방지합니다.
      e.preventDefault();

      try {
        const updatedUser = await userService.updateUser(user);
        
        // 회원정보수정 OK
        if ( updatedUser == true ) {
          alert('회원정보 수정 성공!');
          // 회원가입 후 내 정보 보기로...
          history.push('/user');
        } else {
          alert('회원정보 수정 실패: 서버에서 null 반환');
        }
      } catch (error) {
        console.error('회원정보 수정 실패:', error);
        alert('수정 실패');
      }
    };


  // 1.4 로그인 회원 목록 보기  : 구현예정
  // : 로그인한 회원이 /user/userlist 
  // : pathname 변경시 렌더링시 호출되도록 구현 한 useEffect() 사용
  //==> userEffect() 는 독립적 움직임 여러번 사용가능.
  //////////////////////////////////////////////////////////
  useEffect(() => {

    const fetchUserList = async () => {
      try {
        
        /*
          //API Server
          @PostMapping("json/getUserList")
          public Map<String, Object> getUserList(@RequestBody Search search)
        */
       //==> Search JSON 구성
        const search = {
          currentPage : 1,
          pageSize  : 5
        }
        const userList = await userService.getUserList(search); 

        /* API Server 에서 Map 구성
        	Map<String, Object> map = new HashMap<String, Object>();
		      map.put("list", list );
		      map.put("totalCount", new Integer(totalCount));
        */
       //==> 필요한 List 만 추출.
        setUsers(userList.list);
        
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };

    //==> 로그인 회원만.. 호출. //==> truthy / falsy
    //==> /user/userList 인 경우 호출.
    if( login.userId && pathname.endsWith('/userList') ) {
      //==> useEffect() 은 async 사용 불가 : fetchUser() 사용함.
      fetchUserList();
    }

  }, [pathname]); // pathname 이 변경되면 호출



  /////////////////////////////////////////////////////////////
  // 0. 공통 선처리 : 방어적 코딩 :로그인 / 미 로그인 판단
  
  // 로그인 유무에 따라 화면 구성 
  // LoginManger useEffect() 에서 로그인 유무 확인 후 
  // loginCheckOK 값이 true 일때만 화면 구성.
  if( loginCheckOK === false )  return null;

  // 경우 1> 미 로그인, '/user' 요구시시 회원가입으로. 
  // == : 값만 비교 / === : 값과 data type 도 비교 
  if( ! login.userId && pathname === '/user'){
    return (
      <AddUser onChange={handleChange} onSubmit={handleSubmit} />
    )
  }
  // 경우 2> 미 로그인 회원 '/~~~' 회원관리 서비스를 요구시 로그인으로.
  if( ! login.userId ){
    history.push('/login');
    return null
  }
  //////////////////////////////////////////////////////////


  return (
     <div className="ViewGood">
      <div className="container py-3">
        <nav className="mb-4">
          <ul className="nav justify-content-center gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/">MainPage</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/user">내 정보 보기</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/user/updateUser">내 정보 수정</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/user/userList">회원정보 목록보기</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/user' exact >
            <UserInfo user={user} />
          </Route>
          <Route path='/user/updateUser' exact >
            <UpdateUser user={user} onChange={handleChange} onSubmit={handleSubmitUpdate} />
          </Route>
          <Route path='/user/userList' exact >
            <UserList users={users} />
          </Route>
        </Switch>
      </div>
    </div>

  );
};

export default UserPage;