import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [teams, setTeams] = useState([]); // Stores created teams

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTeam = (e) => {
    e.preventDefault();

    // Add current form data to teams list
    setTeams([...teams, formData]);

    toast.success("✅ Team Created!");

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

  return (
    <div>
      <h1 className="text-5xl text-center mt-15 mb-20 font-medium">
        Create Your Team
      </h1>
      <div className="mt-10 flex gap-10">
        {/* Left half - Form */}
        <form className="w-1/2" onSubmit={createTeam}>
          <h1 className="font-medium text-3xl mb-3">Make a new Team</h1>
          <p className="font-normal text-sm">
            "No teams have joined the arena yet… 🛡 Be the first to create a
            team, rally your players, and get ready to conquer the competition!"
          </p>

          {/* Team Name & Members */}
          <div className="flex gap-4 mt-5">
            <div className="flex-1">
              <label>Team Name</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="input input-lg border w-full"
              />
            </div>
            <div className="flex-1">
              <label>Number of members</label>
              <input
                type="text"
                name="members"
                value={formData.members}
                onChange={handleChange}
                required
                className="input input-lg border w-full"
              />
            </div>
          </div>

          {/* Coach & Month */}
          <div className="flex gap-4 mt-5">
            <div className="flex-1">
              <label>Coach name</label>
              <input
                type="text"
                name="coach"
                value={formData.coach}
                onChange={handleChange}
                required
                className="input input-lg border w-full"
              />
            </div>
            <div className="flex-1">
              <label>Month</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="input input-lg border w-full"
              />
            </div>
          </div>

          {/* Players */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num}>
                <label>Player {num}</label>
                <input
                  type="text"
                  name={`player${num}`}
                  value={formData[`player${num}`]}
                  onChange={handleChange}
                  required
                  className="input input-lg border w-full"
                />
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-6">
            <button className="btn text-white w-full h-12 bg-[#43467F]">
              Create Team
            </button>
          </div>
        </form>

        {/* Right half - Team List */}
        <div className="w-1/2 ml-10 mt-2">
          <h2 className="text-2xl font-semibold mb-1 roboto">Manage Teams</h2>
          {teams.length === 0 ? (
            <div>
              <p className="font-normal text-sm">
                pay a view your created teams into us and you can delete or
                mange your teams in here. Get sure the teams and let’s goo....!
              </p>
              <div className="mt-40  justify-center flex-col text-center ">
                <h1 className="roboto font-bold text-2xl mb-2">NO Teams</h1>
                <p className="text-center font-normal text-sm ">
                  "It’s a little empty here right now… 🏟 No teams have been
                  created yet. Kick things off by starting your very own team
                  and let the competition begin!"
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              <h1 className="font-normal text-sm text-black">pay a view your old tournaments  into us and you can delete or mange your tournament
in here. Get the pin code and get access</h1>
              {teams.map((team, index) => (
              <div className="flex mt-9 gap-x-3">
                  <div className="w-2xs  h-12 rounded-lg bg-[#43467F] flex items-center">
                  <h1 className="ml-5 text-white font-medium">
                    {team.teamName}
                  </h1>
                </div>
                  <button className="btn h-12">Manage Team</button>
              </div>


                //      <li key={index} className="p-3 border rounded shadow">
                //   <h3 className="font-bold">{team.teamName}</h3>
                //   <p>Members: {team.members}</p>
                //   <p>Coach: {team.coach}</p>
                //   <p>Month: {team.month}</p>
                //   <p>
                //     Players: {team.player1}, {team.player2}, {team.player3}, {team.player4}, {team.player5}
                //   </p>
                // </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddTeam;
