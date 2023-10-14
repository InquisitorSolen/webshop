import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Products() {
  const userdata = useSelector((state) => state.userReducer);

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }
  return (
    <>
      <h1>Products</h1>
    </>
  );
}
