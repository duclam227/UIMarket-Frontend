import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../redux/store";

import { PageWithNavbar } from "../../components";
import SectionHero from "./SectionHero";

import style from './LandingPage.module.css';

const LandingPage = () => {

  const currentUser = useSelector((state: State) => state.auth.user);

  return (
    <PageWithNavbar>
      <SectionHero currentUser={currentUser} />
    </PageWithNavbar>
  )
}

export default LandingPage;