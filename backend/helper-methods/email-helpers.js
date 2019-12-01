const replaceValues = (template, employee, job) => {
  //return customized template

  let customTemplate = template;

  let mapObj = {
    "<<employee_name>>": employee.name.split(" ")[0],
    "<<company_name>>": job.company
  };

  customTemplate.subject = customTemplate.subject.replace(
    /<<employee_name>>|<<company_name>>/gm,
    matched => mapObj[matched]
  );

  customTemplate.message = customTemplate.message.replace(
    /<<employee_name>>|<<company_name>>/gm,
    matched => mapObj[matched]
  );

  return customTemplate;
};

module.exports = replaceValues;
