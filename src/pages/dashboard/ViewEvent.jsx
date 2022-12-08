import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/CreateEvent/CreateEventNavbar";
import arrow from "../../assets/icons/arrow-down.svg";
import avatar from "../../assets/img/profile.svg";
import { CatchUpEventContextUse } from "../../context/CatchUpEventContext";
import AddParticipantModal from "../../components/AddParticipantModal";
import { BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import userServices from "../../services/userServices";

const ViewEvent = () => {
  const [isActive, setIsActive] = useState(false);
  const { setShowModal } = CatchUpEventContextUse();
  const [singleEvent, setSingleEvent] = useState({});

  const invitees = [
    {
      id: 1,
      //   image: inviteeImg1,
      position: "1st Invitee",
      name: "Johnson Joshua",
      dateNdTime: "Friday, 21 November 2022 - 4pm",
      status: "Accepted",
    },
  ];
  const toggleShowAccordion = (id) => {
    if (isActive === id) {
      setIsActive();
    } else {
      setIsActive(id);
    }
  };

  useEffect(() => {
    const eArr = localStorage.getItem("eventsArr");
    const events = JSON.parse(eArr);
    const sEvent = events.find((event) => event._id === id);
    setSingleEvent(sEvent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div className="font-['DM_Sans'] w-[90%] lg:w-4/5 mx-auto mt-[100px] my-4 sm:max-w-xl md:max-w-2xl sm:border sm:border-slate-300 sm:rounded-md">
        <main className="sm:p-8 mx-auto">
          <section className="text-center py-5 md:py-0">
            <div className="sm:border-b-2 sm:border-dashed sm:border-slate-300 py-5">
              <h1 className="text-[#0056D6] font-semibold text-[1.4rem] lg:text-3xl">
                {singleEvent?.event_title}
              </h1>
            </div>
            <p className="text-gray-600 mx-auto text-xs md:text-sm my-2">
              {singleEvent?.event_description}
            </p>
            <p className="text-gray-600 mx-auto text-xs md:text-sm my-2">
              <span className="font-semibold">Location:</span>{" "}
              {singleEvent?.location}
            </p>
            <p className="text-gray-600 mx-auto text-xs md:text-sm my-2">
              <span className="font-semibold">Event:</span>{" "}
              {singleEvent?.event_type}
            </p>
          </section>
          <div className="flex flex-row justify-between md:items-center my-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-transparent flex items-center text-[#0056D6]"
            >
              <p className="mr-2 text-sm">Add participant</p>
              <BsPlus />
            </button>

            <aside className="font-medium text-sm  md:mt-0">
              Agreed Date
              {singleEvent?.final_event_date === !null ? (
                <span className="bg-[#E7F0FF] text-[#003585] text-xs px-2 py-1 font-semibold rounded ml-1">
                  {singleEvent?.final_event_date}
                </span>
              ) : (
                <span className="bg-[#E7F0FF] text-[#003585] text-xs px-2 py-1 font-semibold rounded ml-1">
                  Not Decided
                </span>
              )}
            </aside>
          </div>

          <section className="flex flex-col justify-center">
            <div className="max-h-[17em] overflow-y-scroll scroll-blue-500 pr-4">
              {invitees.map((invitee) => (
                <div
                  onClick={() => toggleShowAccordion(invitee.id)}
                  key={invitee.id}
                  className="py-3 border-b border-gray-200 transition-all"
                >
                  <div className="flex justify-between items-center transition-all">
                    <div className="flex items-center">
                      <img
                        className="h-fit w-8 lg:w-10 mr-3"
                        src={invitee.image}
                        alt=""
                      />
                      <div className="space-y-[-3px]">
                        <h4 className="font-semibold text-sm">
                          {invitee.position}
                        </h4>
                        <p className="text-gray-600 text-xs md:text-sm">
                          {invitee.name}
                        </p>
                      </div>
                    </div>
                    <img
                      className={
                        isActive === invitee.id
                          ? "w-3 sm:w-4 md:w-5 rotate-180 transition duration-250 ease-in-out cursor-pointer"
                          : "w-3 sm:w-4 md:w-5 transition duration-250 ease-in-out cursor-pointer"
                      }
                      src={arrow}
                      alt=""
                    />
                  </div>
                  {isActive === invitee.id && (
                    <div className="my-3 space-y-1 transition-all">
                      <h5 className="font-medium text-xs mb-3">
                        Selected Date/Time:{" "}
                        <span className="font-normal">
                          {invitee.dateNdTime}
                        </span>{" "}
                      </h5>
                      <p className="text-gray-500 text-xs font-medium ">
                        Status of Attendance:{" "}
                        <span className="bg-green-200 text-green-900 text-[10px] p-1 rounded ml-1">
                          {invitee.status}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
        <AddParticipantModal eventId={id} />
      </div>
    </>
  );
};

export default ViewEvent;
