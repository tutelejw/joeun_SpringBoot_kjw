
import Nav from './Nav';

// Function Component : 함수기반 컴포넌트 : [ Reactjs.org ] 추천
// 화살표함수(?) 사용 :  가독성과 유용한 기능사용. 익숙해 지자.
//==> View 를 Component 로 Module 화

// function Article(){
// OR
// const Article = function (){
const Article=()=>{

  console.log("Article");

  return(

    <article className='ViewGood'>
      
      <h1>[Article Componet]</h1>

      <h3>HTML</h3>
      HTML is HyperText Markup Language.
    
      { /* 주석입니다 : JSX 주석  */}
      { /* 주석입니다 : Nav 컴포넌트 include(?)  */}
      <Nav/>
    
    </article>

  );
  
}

export default Article;