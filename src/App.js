import React, { useState } from "react";

// All imports are done like this vs destructuring the @material-ui/core
// to reduce the bundle size even further
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";

import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

import moment from "moment";
import "moment/locale/ro";

// This is for the build script to remove locale problems
moment.locale("ro");
const defaultYears = 10;

export default function AdsWizzTestForm() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [isBirthDay, setIsBirthDay] = useState(false);
  const [age, setAge] = useState(defaultYears);
  const [selectedDate, setSelectedDate] = useState(
    moment().subtract(defaultYears, "years").format("YYYY-MM-DD")
  );

  const resetForm = () => {
    setName("");
    setIsBirthDay(false);
    setSelectedDate(moment().format("YYYY-MM-DD"));
    setAge(0);
  };

  const autoFill = () => {
    setName("JC");
    setSelectedDate(moment("01-04-2020", "DD-MM-YYYY").format("YYYY-MM-DD"));
    setAge(10);
  };

  const validateForm = () => {
    if (name !== undefined && name !== "") {
      if (isBirthDay) {
        if (moment(selectedDate).isValid()) {
          setModalOpen(true);
        } else {
          setIsError(true);
          setError("Invalid birth date.");
        }
      } else {
        if (age > 0 && age < 130) {
          setModalOpen(true);
        } else {
          setIsError(true);
          setError("Invalid Age.");
        }
      }
    } else {
      console.log(name);
      setIsError(true);
      setError("Invalid Name.");
    }
  };

  return (
    <>
      <TextField
        id="name"
        label="Name"
        type="text"
        value={name}
        onChange={(nameEvent) => setName(nameEvent.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={isBirthDay}
            onChange={(e) => setIsBirthDay(!isBirthDay)}
            color="primary"
          />
        }
        label={isBirthDay ? "Birthday" : "Age"}
      />
      <br />
      {isBirthDay ? (
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          value={moment(selectedDate).format("YYYY-MM-DD")}
          onChange={(date) =>
            setSelectedDate(moment(date.target.value, "YYYY-MM-DD"))
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      ) : (
        <TextField
          id="age"
          label="Age"
          type="number"
          value={age}
          onChange={(number) => {
            setAge(number.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      <br />
      <br />
      <Button color="primary" variant="contained" onClick={resetForm}>
        Reset
      </Button>
      <Button color="primary" variant="contained" onClick={autoFill}>
        AutoFill
      </Button>
      <br />
      <br />
      <Button color="primary" variant="contained" onClick={validateForm}>
        Submit
      </Button>

      <Modal
        closeAfterTransition
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={isModalOpen}>
          <Paper elevation={3}>
            <div id="modalContent">
              <h1>Summary</h1>
              <h2>Name:</h2>
              <p id="modal-name">{name}</p>
              {isBirthDay ? (
                <>
                  <h2>Birday:</h2>
                  <p id="modal-birthday">
                    {moment(selectedDate).format("YYYY-MM-DD")}
                  </p>
                </>
              ) : (
                <>
                  <h2>Age:</h2>
                  <p id="modal-age">{age}</p>
                </>
              )}
            </div>
          </Paper>
        </Fade>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isError}
        message={error}
        onClose={() => setIsError(false)}
        autoHideDuration={6000}
        variant={"error"}
      />
    </>
  );
}
