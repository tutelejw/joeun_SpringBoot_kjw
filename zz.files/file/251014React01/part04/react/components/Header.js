
import React, { Component } from "react";

// Class Component : 클래스기반 컴포넌트 구성 
//==> View 를 Component 로 Module 화
class Header extends Component{

    // function render() 의 function 생략
    // ==> Java Class, Method 비교이해
    render(){

        console.log("Header");
        
        return(

            <header className='ViewGood'>

                <h1>[Header Componet]</h1>

                <h3>WEB</h3>
                순수한 HTML

            </header>  

        );
    }

}

export default Header;