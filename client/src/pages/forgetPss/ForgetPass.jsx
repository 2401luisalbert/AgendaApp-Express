import backgroundImage from "../../assets/portada.jpg";
import ForgetPassComponent from "../../Components/forgetPassword/ForgetPasComponent";

function ForgetPass() {
  const mobileImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "25vh",
  };

  const desktopImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 align-items-start align-items-md-center">
        <div className="col-12 d-md-none" style={mobileImageStyle}></div>
        <div className="col-md-7 img-fluid d-none d-md-block" style={desktopImageStyle}></div>
        <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center">
            < ForgetPassComponent/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;