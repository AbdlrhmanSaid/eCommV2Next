"use client"; // تأكد من أن المكون هو Client Component

import { store } from "./store";
import { Provider } from "react-redux";

const ProviderApp = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderApp;
