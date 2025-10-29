import { useEffect } from 'react';

const Footer = () => {
  
  //1. console 이용 로그 출력
  console.log('Footer component loaded');

  //2. useEffect 이용 로그 출력 
  useEffect(() => {
    console.log('Footer 컴포넌트 시작 : useEffect() 이용');
  }, []);

  //1,2 의 차이점은 ????

  return (

    <footer className="border-top">
      <div className="container py-3 text-center text-muted">
        Footer 화면 준비중
      </div>
    </footer>
    
  );
};

export default Footer;