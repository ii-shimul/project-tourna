import React, { useState } from "react";
  import { ToastContainer, toast } from 'react-toastify';

const AddTeam = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    members: "",
    coach: "",
    month: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    player5: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTeam = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Reset form
    setFormData({
      teamName: "",
      members: "",
      coach: "",
      month: "",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      player5: "",
    });
  };
    //  const notify = () => toast("Team Created!");

  return (
    <div>
      <h1 className="text-5xl text-center justify-center mt-20 font-medium ">
        Create Your Team
      </h1>
      <div className="mt-25 flex">
        {/* left half */}
        <form className="w-1/2" onSubmit={createTeam}>
          <div>
            <div>
              <h1 className="font-medium text-3xl mb-3">Make a new Team</h1>
              <p className="font-normal roboto text-black text-sm">
                "No teams have joined the arena yet… 🛡 Be the first to create a
                team, rally your players, and get ready to conquer the
                competition!"
              </p>
            </div>
            <div className="mt-10">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h1 className="roboto font-medium">Team Name</h1>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    required
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Number of members</h1>
                  <input
                    type="text"
                    name="members"
                    required
                    value={formData.members}
                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Coach name</h1>
                  <input
                    type="text"
                    name="coach"
                    required

                    value={formData.coach}
                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Month</h1>
                  <input
                    type="text"
                    name="month"
                    required

                    value={formData.month}
                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Player 1</h1>
                  <input
                    type="text"
                    name="player1"
                    required

                    value={formData.player1}
                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Player 2</h1>
                  <input
                    type="text"
                    name="player2"
                    required

                    value={formData.player2}
                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Player 3</h1>
                  <input
                    type="text"
                    name="player3"
                    value={formData.player3}
                    required

                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Player 4</h1>
                  <input
                    type="text"
                    name="player4"
                    value={formData.player4}
                    required

                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div className="flex-1">
                  <h1 className="roboto text-[#5A7184]">Player 5</h1>
                  <input
                    type="text"
                    name="player5"
                    value={formData.player5}
                    required

                    onChange={handleChange}
                    className="input input-lg roboto text-sm border-[#959EAD} w-full"
                  />
                </div>
                <div className="flex-1 mt-6">
                  <button  className="btn text-white w-full h-12 bg-[#43467F]">
                    Create Team
                  </button>
                   {/* <ToastContainer /> */}
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* right half */}
        <div className="">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
