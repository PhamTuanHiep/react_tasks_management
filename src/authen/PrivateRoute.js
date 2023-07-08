import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
function PrivateRoute(props) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const prevLocation = useLocation();

  if (isAuthenticated) {
    return <>{props.children}</>;
  } else {
    return (
      <>
        <Navigate to="/login"></Navigate>
      </>
    );
  }
}
export default PrivateRoute;
