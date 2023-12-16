import React from "react";
import "../../css/doctor.css";
import { Box } from "@mui/system";

export const DoctorList = (props) => {
  // Providing an empty array as a default value
  const { doctors = [] } = props;
  // console.log(props);

  if (!Array.isArray(doctors) || doctors.length === 0) {
    return <div>No doctors available</div>;
  }

  return (
    <Box
      className="box"
      borderRadius={5}
      paddingLeft={5}
      paddingRight={5}
      paddingTop={1}
      paddingBottom={3}
    >
      {doctors.map((doctor, index) => (
        <div key={index} className="doctor-dets">
          <p>{doctor.name}</p>
          <p>{doctor.email}</p>
          <p>6969696969</p>
        </div>
      ))}
    </Box>
  );
};
