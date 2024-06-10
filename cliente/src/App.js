import Layout from "./components/Layout/Layout";

import React from "react";
import { useMediaQuery } from "react-responsive";
// Components
import { Desktop } from "./components/desktop/desktop.component.jsx";
import { Laptop } from "./components/laptop/laptop.component.jsx";
import { BigScreen } from "./components/big-screen/big-screen.component.jsx";
import { Mobile } from "./components/mobile/mobile.component.jsx";
import { TabletMobile } from "./components/table-mobile/tablet-mobile.component.jsx";


function App() {

  const isMobileDevice = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletDevice = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px) and (max-width: 1199px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px) and (max-width: 1201px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1201px)" });

  return (
    <Layout>
      <div className="App">
        <h1>React Responsive - a guide</h1>
        {isMobileDevice && <Mobile />}
        {isTabletDevice && <TabletMobile />}
        {isLaptop && <Laptop />}
        {isDesktop && <Desktop />}
        {isBigScreen && <BigScreen />}
      </div>
    </Layout>
 );

}

export default App;
