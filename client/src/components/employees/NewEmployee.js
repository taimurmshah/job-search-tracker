import React from "react";

import EmployeeDataForm from "./EmployeeDataForm";

const NewEmployee = ({ closeModal, submitHandler }) => {
  return (
    <div>
      <EmployeeDataForm
        submitEmployeeData={submitHandler}
        closeModal={closeModal}
      />
    </div>
  );
};

export default NewEmployee;
