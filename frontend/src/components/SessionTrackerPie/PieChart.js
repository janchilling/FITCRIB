import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Pie.css";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { id } = useParams();
  const [totalSessionsPerDay, setTotalSessionsPerDay] = useState();
  const [completedSessions, setCompletedSessions] = useState();

  useEffect(() => {
    function fetchWorkout() {
      axios
        .get(`http://localhost:8070/workoutPlan/${id}`)
        .then((res) => {
          setTotalSessionsPerDay(res.data.workoutDuration * 4);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchWorkout();
  }, [id]);

  useEffect(() => {
    function fetchSessions() {
      axios
        .get(`http://localhost:8070/workoutSession/${id}`)
        .then((res) => {
          let maxDay = 0;
          for (const [i] of res.data.entries()) {
            if (res.data[i].day > maxDay) {
              maxDay = res.data[i].day;
            }
          }
          function ascendingArray(num) {
            let arr = [];
            for (let i = 0; i <= num; i++) {
              arr.push(i);
            }
            return arr;
          }
          let dayArray = ascendingArray(maxDay);

          const completedSessionsArr = Array(maxDay + 1).fill(0);
          for (const [i] of res.data.entries()) {
            if (dayArray.includes(res.data[i].day)) {
              completedSessionsArr[res.data[i].day] += 1;
            }
          }
          setCompletedSessions(completedSessionsArr);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchSessions();
  }, [id]);

  const data = (index) => {
    const chart = {
      labels: ["Completed Sessions", "Incomplete Sessions"],
      datasets: [
        {
          label: "Sessions",
          data: completedSessions
            ? [
                completedSessions[index],
                totalSessionsPerDay - completedSessions[index],
              ]
            : [],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return chart;
  };

  return (
    <>
      <div className="piechartdiv">
        <br />
        <h1 className="piechartheading">Progress Details</h1>
        <br />
        <div className="piechart">
          <div className="piecontainer">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {completedSessions &&
                  completedSessions.map((item, index) => {
                    return (
                      <item>
                        <div
                          key={index}
                          className={`${"active" === index ? "active" : ""}`}
                          style={{
                            width: "40%",
                            height: "40%",
                            border: "5px solid #99FF33",
                            backgroundColor: "white",
                          }}
                        >
                          <p className="piechartpara">
                            Day {index + 1} completed sessions
                          </p>

                          <Pie data={data(index)} className="piechartWO" />
                        </div>
                        <br />
                      </item>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}
