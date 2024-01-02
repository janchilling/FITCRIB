import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function DeleteButton(props) {
  const navigate = new useNavigate();

  const handleDelete = (deleteId) => {
    if (window.confirm("Are you sure you want to delete workout?")) {
      axios
        .delete(`http://localhost:8070/workoutPlan/${deleteId}`)
        .then(() => {
          navigate(`/MyWorkouts`);
          window.location.reload();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          handleDelete(props.id);
        }}
      >
        Delete Plan
      </Button>
    </>
  );
}
