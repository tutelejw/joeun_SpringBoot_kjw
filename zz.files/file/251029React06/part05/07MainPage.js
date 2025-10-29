
import { Col, Container, Row } from "react-bootstrap";
import Main01 from "../components/main/Main01";
import Main02 from "../components/main/Main02";

//////////////////////////////////////////////////
//import Header from "../components/common/01Header";
//import Header from "../components/common/02Header";
import Header from "../components/common/07Header";
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//import Footer from "../components/common/Footer";
import Footer from "../components/common/07Footer";

const MainPage = () => {

  console.log('Main Container component loaded');
  

  return (

    <Container fluid className="ViewGood">

      <Header/>

      <Row className="py-3 g-3">
        <Col lg={3} md={3} sm={12}><div className="card p-3"><Main01/></div></Col>
        <Col lg={9} md={9} sm={12}><div className="card p-3"><Main02/></div></Col>
      </Row>

      <Footer/>

    </Container>

  );
};

export default MainPage;