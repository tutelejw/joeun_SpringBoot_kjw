
//Function Component : 함수기반 컴포넌트 : [ Reactjs.org ] 추천
//==> View 를 Component 로 Module 화
function Nav(){

    console.log("Nav");

    return(

        <nav className='ViewGood'>
            
            <h1>[Nav Componet]</h1> 

            <ul>
                <li>1. HTML : 정적인 화면.</li>
                <li>2. CSS : 이쁘게(?) 만들고.</li>
                <li>3. JavaScript 동적화면 구성.</li>
            </ul>

        </nav>
        
    );

}

export default Nav;