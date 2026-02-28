/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Solutions } from "./pages/Solutions";
import { Product } from "./pages/Product";
import { Locations } from "./pages/Locations";
import { Standard } from "./pages/Standard";
import { Contacts } from "./pages/Contacts";
import { DynamicLanding } from "./pages/DynamicLanding";
import { Pricing } from "./pages/Pricing";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:id" element={<Product />} />
            <Route path="locations" element={<Locations />} />
            <Route path="standard" element={<Standard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="l/:slug" element={<DynamicLanding />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
