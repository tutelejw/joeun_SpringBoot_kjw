import './App.css';

import Nav from './components/Nav';
import Article from './components/Article';
import Header from './components/Header';

function App() {

  console.log("App");

  /* 
    Return 내부에 쓰는 내용 : JSX (A Syntax eXtension to JavaScript)
    - JSP ==> Servlet 으로변환 HTML 전송
    - JSX ==> JS 로 변환 HTML 만듬. 
      (reactjs.org => Tutorial : What is React ?  확인 )

    JSX 규칙 1 : Root Tag 필수
    JSX 규칙 2 : Java Script 는 {} => JSX Expression
    JSX 규칙 3 : 주석(JSX 주석)은 아래의 형식 참조
    JSX 규칙 4 : End Tag 반드시.
  */

  return (

    <div className='ViewGood'>

      <h1>Componets(화면을 Module(?) 로 구성하자....)</h1> 

      { /* 주석입니다 : JSX 주석  */}
      { /* 주석입니다 : Header, Nav, Article 컴포넌트 include(?)  */}
      <Header/>
      <Nav/>
      <Article/>

    </div>

  );
}

export default App;
