import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import Loader from "./../Loader";

const ModalFormComponent = (props) => {
  const { closeModal, } = props;
  const { updateRegister, user, errors: registerErrors } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Manejador del envío del formulario
  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updatedUser = {
        ...user, // Conserva los datos existentes del usuario
        ...values, // Agrega los nuevos datos del formulario
      };
      const updateRegisterResult = await updateRegister(updatedUser);
      if (!updateRegisterResult) {
        setLoading(false);
        return;
      }
      setLoading(false);
      closeModal()
    } catch (error) {
      console.log(error); // Manejar el error de acuerdo a tus necesidades
    }
  });

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <>
          {registerErrors.map((error, i) => (
            <div className="alert alert-danger p-2 m-2" key={i}>
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit}>
            {/* Campo INE_CIC */}
            <div className="mb-3">
              <label htmlFor="INE_CIC" className="form-label">
                INE_CIC
              </label>
              <input
                type="text"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="INE_CIC"
                name="INE_CIC"
                {...register("INE_CIC", { required: true })}
              />
              {errors.INE_CIC && (
                <small className="text-danger">INE_CIC requerida</small>
              )}
            </div>

            {/* Campo INE_ID */}
            <div className="mb-3">
              <label htmlFor="INE_ID" className="form-label">
                INE_ID
              </label>
              <input
                type="text"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="INE_ID"
                name="INE_ID"
                {...register("INE_ID", { required: true })}
              />
              {errors.INE_ID && (
                <small className="text-danger">INE_ID requerida</small>
              )}
            </div>

            {/* Campo domicilio */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Domicilio
              </label>
              <input
                type="text"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="address"
                name="address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <small className="text-danger">Domicilio requerido</small>
              )}
            </div>

            {/* Campo num_tel */}
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Tel./cel.
              </label>
              <input
                type="text"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="123-456-7890"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <small className="text-danger">
                  Numero de teléfono requerido
                </small>
              )}
            </div>

            {/* Campo image_Url */}
            {/* <div className="mb-3">
              <label htmlFor="image_Url" className="form-label">
                Foto de perfil
              </label>
              <input
                type="file"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="image_Url"
                name="image_Url"
                {...register("image_Url", { required: false })}
              />
              {errors.image_Url && (
                <small className="text-danger">Foto requerida requerida</small>
              )}
            </div> */}

            {/* Campo hidden */}
            <input
              type="hidden"
              defaultValue="true"
              {...register("complement")}
            />

            {/* Botón Registrar */}
            <div className="d-flex justify-content-evenly mb-3">
              <button type="submit" className="btn btn-outline-dark">
                Registrar
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default ModalFormComponent;
