import React, { useState } from "react";

const ManageTeams = () => {
  const [players, setPlayers] = useState([
    {
      oldName: "Player 1",
      newName: "",
      played: 100,
      kill: 491,
      clutch: 87,
      assists: 652,
      ace: 47,
      die: 307,
      hs: 87,
      plant: 47,
      defuse: 34,
    },
    {
      oldName: "Player 2",
      newName: "",
      played: 100,
      kill: 491,
      clutch: 87,
      assists: 652,
      ace: 47,
      die: 307,
      hs: 87,
      plant: 47,
      defuse: 34,
    },
    {
      oldName: "Player 3",
      newName: "",
      played: 100,
      kill: 491,
      clutch: 87,
      assists: 652,
      ace: 47,
      die: 307,
      hs: 87,
      plant: 47,
      defuse: 34,
    },
    {
      oldName: "Player 4",
      newName: "",
      played: 100,
      kill: 491,
      clutch: 87,
      assists: 652,
      ace: 47,
      die: 307,
      hs: 87,
      plant: 47,
      defuse: 34,
    },
    {
      oldName: "Player 5",
      newName: "",
      played: 100,
      kill: 491,
      clutch: 87,
      assists: 652,
      ace: 47,
      die: 307,
      hs: 87,
      plant: 47,
      defuse: 34,
    },
  ]);

  const [stats, setStats] = useState({ matchesPlayed: 12, win: 7, lose: 5 });

  const handleChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleUpdateTeam = () => {
    console.log("Updated Team:", players);
    console.log("Team Stats:", stats);
    alert("Team updated successfully!");
  };

  return (
    <div className="max-w-7xl mt-10">
      <h1 className="font-medium text-5xl mb-3">Manage your team</h1>
      <p className="font-normal text-sm w-4xl mb-10">
        "Take full control of your squad! 🏆 Change your team name to match your
        style, adjust points as the tournament progresses, and keep everything
        organized so your team is always ready for the next challenge."
      </p>
      <h2 className="text-lg font-medium mb-5">Overview</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Player Names */}
        <div className="space-y-4 mt-5">
          {players.map((player, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded space-y-2">
              <input
                type="text"
                placeholder="Old name"
                value={player.oldName}
                onChange={(e) => handleChange(index, "oldName", e.target.value)}
                className=" w-2xs  h-12 rounded-lg bg-[#43467F] border border-gray-300  text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="New name"
                value={player.newName}
                onChange={(e) => handleChange(index, "newName", e.target.value)}
                className=" w-2xs  h-12 rounded-lg border-green-600 border    px-2 py-1 focus:outline-none focus:ring-2 ml-2 focus:ring-indigo-400"
              />
            </div>
          ))}
        </div>

        {/* Editable Stats Table */}
        <div>
          <div className="grid grid-cols-9 gap-4 text-sm font-medium mb-3">
            <span>Played</span>
            <span>Kill</span>
            <span>Clutch</span>
            <span>Assists</span>
            <span>Ace</span>
            <span>Die</span>
            <span>Hs %</span>
            <span>Plant</span>
            <span>Defuse</span>
          </div>
          {players.map((player, index) => (
            <div
              key={index}
              className="grid grid-cols-9 gap-x-4 space-y-13 text-sm text-gray-700 py-2 border-b border-gray-100"
            >
              {[
                "played",
                "kill",
                "clutch",
                "assists",
                "ace",
                "die",
                "hs",
                "plant",
                "defuse",
              ].map((stat) => (
                <input
                  key={stat}
                  type="number"
                  value={player[stat]}
                  onChange={(e) => handleChange(index, stat, e.target.value)}
                  className="w-full border border-gray-300 rounded px-1 py-1 text-center"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between mt-6 text-gray-500">
        <span>Matches played {stats.matchesPlayed}</span>
        <span>win {String(stats.win).padStart(2, "0")}</span>
        <span>lose {stats.lose}</span>
      </div>

      {/* Update Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleUpdateTeam}
          className="bg-[#43467F] text-white px-6 py-2 rounded-lg hover:bg-[#3a3d6a]"
        >
          Update Team
        </button>
      </div>
    </div>
  );
};

export default ManageTeams;
