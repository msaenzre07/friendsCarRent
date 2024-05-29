

import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import LinesChart from "../informes/LinesChart";
import BarsChart from "../informes/BarsChart";
import PiesChart from "../informes/PiesChart";





function Informes  ()  {
    return (
      <Helmet title="Informe de Vehículos">
        <CommonSection title="Informe de Vehículos" />
  
        <section>
          <Container>
            <Row>
         
        <div>
    
            <div>
                <p className="m-2"><b>Vehículo con mayor kilometraje:</b> </p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                    <LinesChart />
                </div>
            </div>
            <hr className="mt-3 mb-2"/>
            <div>
                <p className="m-2"><b>Modelo de vehículo más alquilado: </b></p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"225px"}}>
                    <BarsChart />
                </div>
            </div>
            <hr className="mt-3 mb-2"/>
            <div>
                <p className="m-2"><b>Vehículo menos alquilado: </b></p>
                <div className="bg-light mx-auto border border-2 border-primary" style={{width:"450px", height:"250px"}}>
                    <div style={{width:"100%", height:"100%", padding:"10px 0"}}>
                        <PiesChart />                       
                    </div>
                </div>
            </div>
        </div>
        </Row>
          </Container>
        </section>
      </Helmet>
    );
  }
  
  export default Informes;
  