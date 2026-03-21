"use client";

import React from "react";
import PrivateRoute from "../components/PrivateRoute";

export const withPrivateRoute = (Component) => {
  const Wrapped = (props) => (
    <PrivateRoute>
      <Component {...props} />
    </PrivateRoute>
  );

  Wrapped.displayName = `WithPrivateRoute(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};
