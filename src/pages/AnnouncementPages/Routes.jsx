import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./HomePage/index";
import AnnouncementDetailPage from "./AnnouncementDetailPage/index";
import ServiceDetailsPage from "./ServiceDetailsPage/index";
import CreatePage from "./CreatePage/index";


const AnnouncementsRoutes = (
  <Route path="/announcements/*">
    <Route path="" element={<HomePage />} />
    <Route path="_/details/:meta/" element={<AnnouncementDetailPage />} />
    <Route path="services/details/:meta/" element={<ServiceDetailsPage />} />
    <Route path="create/" element={<CreatePage />} />
  </Route>
);

export default AnnouncementsRoutes;
