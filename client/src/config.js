const config = {
  url:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL
      : process.env.PUBLIC_URL
};
export default config;
