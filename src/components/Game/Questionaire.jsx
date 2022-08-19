import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const Questionaire = ({ show, room, setVote, setShow }) => {
  const sendToserver = (e) => {
    console.log(e.target.getAttribute("value"));
    room.send("vote", { vote: e.target.getAttribute("value") });
    setVote(String(e.target.getAttribute("value")));
    setShow(false);
  };
  return (
    <div className={`modal ${show && "modal-open"}`}>
      <div className="modal-box">
        <div className="flex flex-row-reverse">
          <CountdownCircleTimer
            isPlaying
            size={50}
            duration={5}
            colors={["#00FF00", "#c8ff00", "#ffd000", "#ff7300"]}
            colorsTime={[5, 3, 1, 0]}
            strokeWidth={6}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>

        <div className="modal-action">
          <div className="flex flex-col w-full lg:flex-row">
            <div
              className="grid flex-grow h-32 btn rounded-box place-items-center"
              value={true}
              onClick={sendToserver}
            >
              One
            </div>
            <div className="divider lg:divider-horizontal">OR</div>
            <div
              htmlFor="my-modal"
              className="grid flex-grow h-32 btn  rounded-box place-items-center"
              value={false}
              onClick={sendToserver}
            >
              two
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionaire;
