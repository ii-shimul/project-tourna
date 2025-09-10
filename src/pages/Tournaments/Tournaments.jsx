/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const formats = [
  { label: "Single Elimination", value: "single_elimination" },
  { label: "Round Robin", value: "round_robin" },
];

const statuses = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Finished", value: "finished" },
];

export default function Tournament() {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      format: "single_elimination",
      start_date: new Date().toISOString().split("T")[0],
      status: "upcoming",
    },
  });

  const [tournaments, setTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamQuery, setTeamQuery] = useState("");
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

  // Load tournaments
  const loadTournaments = async () => {
    try {
      const res = await fetch("http://localhost:3000/tournaments");
      const json = await res.json();

      setTournaments(json.tournaments);
    } catch (e) {
      console.error("Failed to load tournaments", e);
      toast.error("Failed to load tournaments");
    }
  };

  // Load user's teams for selection
  const loadTeams = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/teams?user_id=${user?.id}`
      );
      const json = await res.json();
      setTeams(json.teams);
    } catch (e) {
      console.error("Failed to load teams", e);
      toast.error("Failed to load teams");
    }
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      loadTeams();
    }
  }, [isModalOpen, loadTeams]);

  const filteredTeams = useMemo(() => {
    const q = teamQuery.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.members?.[0] || "").toLowerCase().includes(q)
    );
  }, [teams, teamQuery]);

  const toggleTeam = (id) => {
    setSelectedTeamIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data) => {
    try {
      const newTournament = {
        name: data?.name || "Untitled",
        format: data?.format || "single_elimination",
        start_date: data?.start_date || new Date().toISOString().split("T")[0],
        status: data?.status || "upcoming",
        created_by: user?.id || null,
        data_json: {
          teams: selectedTeamIds, // store team IDs in the tournament's JSON
          matches: [],
        },
      };

      const res = await fetch("http://localhost:3000/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTournament),
      });

      if (!res.ok) {
        toast.error("Failed to create tournament");
        return;
      }

      toast.success("Tournament created");
      setIsModalOpen(false);
      reset();
      setSelectedTeamIds([]);
      await loadTournaments();
    } catch (e) {
      console.error("Create tournament error", e);
      toast.error("Failed to create tournament");
    }
  };

  return (
    <div className="bg-base-100">
      <div className="border-b bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Tournaments</h1>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline" onClick={loadTournaments}>
              Refresh
            </button>
            <button
              className="btn bg-black text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Add tournament
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title">Existing tournaments</h2>
                <span className="badge badge-neutral">
                  {tournaments.length}
                </span>
              </div>

              {tournaments.length ? (
                <ul className="mt-4 space-y-3">
                  {tournaments.map((t) => (
                    <li
                      key={t.id}
                      className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center bg-base-100 rounded-xl p-4 border"
                    >
                      <div className="sm:col-span-3">
                        <div className="font-medium">{t.name}</div>
                        <div className="text-sm opacity-70">
                          {t.format === "single_elimination"
                            ? "Single Elimination"
                            : "Round Robin"}
                          <span
                            className={`ml-2 badge badge-sm ${
                              t.status === "upcoming"
                                ? "badge-primary"
                                : t.status === "ongoing"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          <span className="badge badge-outline badge-xs mr-2">
                            {t.teams_count} teams
                          </span>
                          <span className="badge badge-outline badge-xs">
                            {t.matches_count} matches
                          </span>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="text-sm opacity-70">ID</div>
                        <div className="font-mono text-xs truncate">{t.id}</div>
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button className="btn btn-outline btn-sm">
                          Details
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6">
                  <div className="alert">
                    <span>
                      No tournaments yet. Click <b>Add tournament</b> to create
                      one.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h2 className="card-title">Quick tips</h2>
              <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
                <li>
                  Use the <b>Add tournament</b> button to open the form.
                </li>
                <li>After creation, items appear at the top of the list.</li>
                <li>Single Elimination is a bracket-style tournament.</li>
                <li>Round Robin has everyone play against everyone else.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          <h3 className="font-semibold text-xl mb-2">Create a tournament</h3>
          <p className="text-sm opacity-70 mb-4">
            Fill in the details below and select teams to participate.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Tournament name</span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {errors.name.message}
                    </span>
                  </div>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Tournament format</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  {...register("format", { required: true })}
                >
                  {formats.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Start date</span>
                </div>
                <input
                  type="date"
                  className={`input input-bordered w-full ${
                    errors.start_date ? "input-error" : ""
                  }`}
                  {...register("start_date", {
                    required: "Start date is required",
                  })}
                />
                {errors.start_date && (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {errors.start_date.message}
                    </span>
                  </div>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Status</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  {...register("status", { required: true })}
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="divider my-1"></div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="label p-0">
                  <span className="label-text">Add teams</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered input-sm md:input-md"
                  placeholder="Search teams"
                  value={teamQuery}
                  onChange={(e) => setTeamQuery(e.target.value)}
                />
              </div>

              <div className="max-h-60 overflow-auto space-y-2 border rounded-lg p-3 bg-base-100">
                {filteredTeams.map((t) => {
                  const checked = selectedTeamIds.includes(t.id);
                  return (
                    <label
                      key={t.id}
                      className="flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={checked}
                          onChange={() => toggleTeam(t.id)}
                        />
                        <div>
                          <div className="font-medium text-sm">{t.name}</div>
                          <div className="text-xs opacity-70">
                            {t.members_count} members • Captain:{" "}
                            {t.members?.[0] || "—"}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-[10px] opacity-60">
                        {t.id}
                      </div>
                    </label>
                  );
                })}

                {filteredTeams.length === 0 && (
                  <div className="text-sm opacity-70">No teams found.</div>
                )}
              </div>

              {selectedTeamIds.length > 0 && (
                <div className="text-xs opacity-70 mt-2">
                  Selected: {selectedTeamIds.length} teams
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedTeamIds([]);
                }}
              >
                Cancel
              </button>
              <button className="btn bg-black text-white" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
        <div
          className="modal-backdrop"
          onClick={() => {
            setIsModalOpen(false);
            setSelectedTeamIds([]);
          }}
        ></div>
      </div>
    </div>
  );
}
