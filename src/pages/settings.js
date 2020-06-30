import React from "react";
import SettingsSection from "components/SettingsSection";
import { requireAuth } from "util/auth.js";

function SettingsPage(props) {
  return (
    <SettingsSection
      color="white"
      size="medium"
      backgroundImage=""
      backgroundImageOpacity={1}
    ></SettingsSection>
  );
}

export default requireAuth(SettingsPage);
