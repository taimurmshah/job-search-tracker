import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import JobSearchNavbar from "./JobSearchNavbar";
import NewJobSearch from "./NewJobSearch";
import ViewJobSearches from "./ViewJobSearches";

const JobSearch = () => {
  const [create, setCreate] = useState(false);
  const [view, setView] = useState(false);

  const handleCreate = () => {
    setCreate(true);
    setView(false);
  };

  const handleView = () => {
    setView(true);
    setCreate(false);
  };

  return (
    <div>
      <JobSearchNavbar create={handleCreate} view={handleView} />
      {create && <NewJobSearch />}
      {view && <ViewJobSearches />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
