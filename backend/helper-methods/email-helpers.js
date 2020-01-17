const replaceValues = (template, employee, job) => {
  //return customized template

  let customTemplate = template;

  let link = job.link;

  if (job.link[0] !== "h") {
    console.log("adding shit");
    link = "https://" + link;
  }

  console.log("job link:", job.link);
  console.log("new link:", link);

  let mapObj = {
    "<<employee_name>>": employee.name.split(" ")[0],
    "<<company_name>>": job.company,
    "<<job_link>>": link
  };

  customTemplate.subject = customTemplate.subject.replace(
    /<<employee_name>>|<<company_name>>/gm,
    matched => mapObj[matched]
  );

  customTemplate.message = customTemplate.message.replace(
    /<<employee_name>>|<<company_name>>|<<job_link>>/gm,
    matched => mapObj[matched]
  );

  return customTemplate;
};

module.exports = replaceValues;
