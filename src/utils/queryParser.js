export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    app: params.get("app"),
    redirect: params.get("redirect"),
  };
};