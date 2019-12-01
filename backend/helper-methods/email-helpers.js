const replaceValues = (template, employee, job) => {
  //return customized template

  let customTemplate = template;

  let { subject, message } = customTemplate;

  let mapObj = {
    "<<employee_name>>": employee.name.split(" ")[0],
    "<<company_name>>": job.company
  };

  subject.replace(
    /<<employee_name>>|<<company_name>>/gim,
    matched => mapObj[matched]
  );

  message.replace(
    /<<employee_name>>|<<company_name>>/gim,
    matched => mapObj[matched]
  );

  console.log({ customTemplate });

  return customTemplate;
};

module.exports = replaceValues;
