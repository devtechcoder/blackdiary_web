"use client";

import PageComponent from "../../src/pageComponents/postDiary/index";
import { withPrivateRoute } from "../../src/next/withPrivateRoute";

export default withPrivateRoute(PageComponent);
