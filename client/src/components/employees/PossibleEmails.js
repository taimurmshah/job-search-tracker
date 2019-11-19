import React from "react";
import { connect } from "react-redux";

const PossibleEmails = props => {
  const possibleEmails = (name, website) => {
    let emails = [];
    let firstName = name.split(" ")[0].toLowerCase();
    let lastName = name.split(" ")[1].toLowerCase();

    emails.push(firstName + "@" + website);
    emails.push(firstName + "." + lastName + "@" + website);
    emails.push(lastName + "." + firstName + "@" + website);

    emails.push(firstName[0] + "." + lastName + "@" + website);
    emails.push(firstName[0] + lastName + "@" + website);
    emails.push(firstName + "." + lastName[0] + "@" + website);
    emails.push(firstName + lastName[0] + "@" + website);

    emails.push(lastName[0] + "." + firstName + "@" + website);
    emails.push(lastName[0] + firstName + "@" + website);
    emails.push(lastName + "." + firstName[0] + "@" + website);
    emails.push(lastName[0] + firstName[0] + "@" + website);

    return emails.map(e => <li>{e}</li>);
  };
  return (
    <div>
      <p>possible emails</p>
    </div>
  );
};

export default PossibleEmails;
