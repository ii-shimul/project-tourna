import React, { useState } from "react";

const TeamDetails = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    membersCount: "",
    coachName: "",
    month: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    player5: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Team Created:", formData);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Make a New Team</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
          placeholder="Team Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="membersCount"
          value={formData.membersCount}
          onChange={handleChange}
          placeholder="Number of Members"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="coachName"
          value={formData.coachName}
          onChange={handleChange}
          placeholder="Coach Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="month"
          value={formData.month}
          onChange={handleChange}
          placeholder="Month"
          className="input input-bordered w-full"
        />
        {[1, 2, 3, 4, 5].map((num) => (
          <input
            key={num}
            type="text"
            name={`player${num}`}
            value={formData[`player${num}`]}
            onChange={handleChange}
            placeholder={`Player ${num}`}
            className="input input-bordered w-full"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="btn mt-4 bg-green-600 text-white"
      >
        Save Team
      </button>
    </div>
  );
};

export default TeamDetails;
