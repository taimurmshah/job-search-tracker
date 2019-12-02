import React from "react";
import { connect } from "react-redux";

const PossibleEmails = ({ name, website }) => {
  console.log({ name });
  console.log({ website });

  if (website.startsWith("www.")) {
    website = website.split("www.")[1];
  }

  const possibleEmails = (name, website) => {
    let emails = [];
    let firstName = name.split(" ")[0].toLowerCase();
    let lastName = name.split(" ")[1].toLowerCase();

    emails.push(firstName + lastName + "@" + website);

    emails.push(firstName + "@" + website);

    emails.push(firstName + "." + lastName + "@" + website);
    emails.push(lastName + "." + firstName + "@" + website);

    emails.push(firstName + "_" + lastName + "@" + website);
    emails.push(lastName + "_" + firstName + "@" + website);

    emails.push(firstName[0] + "." + lastName + "@" + website);
    emails.push(lastName + "." + firstName[0] + "@" + website);

    emails.push(firstName[0] + "_" + lastName + "@" + website);
    emails.push(lastName + "_" + firstName[0] + "@" + website);

    emails.push(firstName[0] + lastName + "@" + website);
    emails.push(lastName + firstName[0] + "@" + website);

    emails.push(firstName + "." + lastName[0] + "@" + website);
    emails.push(lastName[0] + "." + firstName + "@" + website);

    emails.push(firstName + "_" + lastName[0] + "@" + website);
    emails.push(lastName[0] + "_" + firstName + "@" + website);

    emails.push(firstName + lastName[0] + "@" + website);
    emails.push(lastName[0] + firstName + "@" + website);

    return emails.map((e, i) => <li key={i}>{e}</li>);
  };
  return (
    <div className="poss-email-container">
      <p>possible emails</p>
      <ul className="poss-email-list">{possibleEmails(name, website)}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    website: state.job.currentJob.website,
    name: state.employee.currentEmployee.name
  };
};

export default connect(mapStateToProps)(PossibleEmails);
