import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import Loader from "./../Loader";

const ModalFormComponent = ({ closeModal }) => {
  const { updateRegister, user, errors: registerErrors } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("image_Profile", selectedFile);

      const updateRegisterResult = await updateRegister(user.id, formData);

      if (!updateRegisterResult) {
        return;
      }

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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
                <small className="text-danger">INE_CIC requerido</small>
              )}
            </div>

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
                <small className="text-danger">INE_ID requerido</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
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
                <small className="text-danger">Dirección requerida</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Numero telefónico
              </label>
              <input
                type="text"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="phoneNumber"
                name="phoneNumber"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <small className="text-danger">Numero telefónico requerido</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image_Profile" className="form-label">
                Foto de perfil
              </label>
              <input
                type="file"
                className="form-control"
                style={{ width: 300, height: 30, marginTop: -10 }}
                id="image_Profile"
                name="image_Profile"
                onChange={handleFileChange}
              />
            </div>

            <input type="hidden" defaultValue="true" {...register("complement")} />

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
