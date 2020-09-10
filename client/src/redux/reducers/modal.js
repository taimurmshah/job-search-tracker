const initialState = {
  isBigModalOpen: false,
  isSmallModalOpen: false,
  employeeDataForm: false,
  addEmail: false,
  emailContainer: false,
  employeeResponse: false,
  deleteEmployee: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "EMPLOYEE_DATA_FORM":
      return { ...state, isBigModalOpen: true, employeeDataForm: true };
    case "ADD_EMAIL":
      return { ...state, isBigModalOpen: true, addEmail: true };
    case "EMAIL_CONTAINER":
      return { ...state, isBigModalOpen: true, emailContainer: true };
    case "EMPLOYEE_RESPONSE":
      return { ...state, isSmallModalOpen: true, employeeResponse: true };
    case "DELETE_EMPLOYEE_MODAL":
      console.log("DELETE EMPLOYEE MODAL");
      return { ...state, isSmallModalOpen: true, deleteEmployee: true };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        isSmallModalOpen: false,
        employeeDataForm: false,
        addEmail: false,
        emailContainer: false,
        employeeResponse: false,
        deleteEmployee: false
      };
    default:
      return state;
  }
}
