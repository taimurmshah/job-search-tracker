import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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

    emails.push(firstName[0] + "." + lastName + "@" + website);
    emails.push(lastName + "." + firstName[0] + "@" + website);

    emails.push(firstName[0] + lastName + "@" + website);
    emails.push(lastName + firstName[0] + "@" + website);

    emails.push(firstName + "." + lastName[0] + "@" + website);
    emails.push(lastName[0] + "." + firstName + "@" + website);

    emails.push(firstName + lastName[0] + "@" + website);
    emails.push(lastName[0] + firstName + "@" + website);

    return emails.map((e, i) => <li key={i}>{e}</li>);
  };
  return (
    <>
      <Title>Possible Emails</Title>
      <List className="poss-email-list">{possibleEmails(name, website)}</List>
    </>
  );
};

const mapStateToProps = state => {
  return {
    website: state.job.currentJob.website,
    name: state.employee.currentEmployee.name
  };
};

export default connect(mapStateToProps)(PossibleEmails);

const List = styled.ul`
  list-style: none;
  line-height: 20px;
`;

const Container = styled.div`
  position: fixed;
  right: 75px;
  top: 57px;
  padding: 0 5px;
`;

const Title = styled.p`
  font-size: 20px;
  padding-bottom: 10px;
`;
