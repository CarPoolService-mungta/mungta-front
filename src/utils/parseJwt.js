const parseJwt = token => {
  try {
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload));
  } catch (e) {
    return e;
  }
};
export default parseJwt;
