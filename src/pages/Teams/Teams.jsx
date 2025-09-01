import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { BsX } from "react-icons/bs";
import AuthContext from "../../contexts/AuthContext";

// Select options
const games = [
  { label: "Football", value: "Football" },
  { label: "Cricket", value: "Cricket" },
  { label: "Basketball", value: "Basketball" },
  { label: "eSports", value: "eSports" },
  { label: "Volleyball", value: "Volleyball" },
];

const CURRENT_USER_ID = 1; // This would come from authentication context

export default function TeamsPage() {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState("");
  const [filterGame, setFilterGame] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [openCreate, setOpenCreate] = useState(false);
  const [inspectTeam, setInspectTeam] = useState(null);

  // Load existing teams on mount
  useEffect(() => {
    // Fetch teams from the backend
    const fetchTeams = async () => {
      try {
        // In production, replace with actual API call:
        // const response = await axios.get(`${API_BASE_URL}/teams`);
        // const fetchedTeams = response.data;

        // Mock data for development until backend is ready
        const mockTeams = [
          {
            id: 101,
            name: "Crimson Hawks",
            owner_user_id: 1,
            members_json: JSON.stringify([
              "Arif Rahman",
              "J. Khan",
              "S. Hossain",
              "T. Malik",
              "R. Khatun",
              "M. Alam",
              "H. Chowdhury",
              "B. Das",
              "N. Naser",
              "I. Uddin",
              "F. Islam",
            ]),
            members_count: 11,
            game: "Football",
            created_at: "2025-08-01T00:00:00.000Z",
          },
          {
            id: 102,
            name: "Pixel Ninjas",
            owner_user_id: 2,
            members_json: JSON.stringify([
              "Nadia Noor",
              "Rafi",
              "Javed",
              "Pinky",
              "Sifat",
            ]),
            members_count: 5,
            game: "eSports",
            created_at: "2025-08-12T00:00:00.000Z",
          },
        ];

        // Transform data to match our frontend model
        const transformedTeams = mockTeams.map((team) => ({
          id: team.id,
          name: team.name,
          owner_user_id: team.owner_user_id,
          game: team.game || "Unknown",
          captain: JSON.parse(team.members_json)[0] || "Unknown",
          members: JSON.parse(team.members_json),
          membersCount: team.members_count,
          createdAt: new Date(team.created_at).toISOString().slice(0, 10),
        }));

        setTeams(transformedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, []);

  // Derived filtered/sorted list
  const filtered = useMemo(() => {
    let list = [...teams];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.captain.toLowerCase().includes(q)
      );
    }
    if (filterGame !== "All") {
      list = list.filter((t) => t.game === filterGame);
    }
    switch (sortBy) {
      case "Name A-Z":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Members":
        list.sort((a, b) => b.members.length - a.members.length);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [teams, query, filterGame, sortBy]);

  // Create Team form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      user_id: user.id,
      members: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "members",
    control,
  });
  // Above trick avoids TS complaints in plain JS projects; if using TS, pass the control from useForm.

  const onCreate = async (data) => {
    try {
      // Extract member names from the form data
      const memberNames = (data.members || [])
        .map((m) => m.name)
        .filter(Boolean);
      // For development: Create an optimistic UI update before API call
      const newTeam = {
        name: data.name,
        owner_user_id: CURRENT_USER_ID,
        members: memberNames,
      };

      console.log(newTeam);

      // Update UI optimistically
      setTeams((prev) => [newTeam, ...prev]);

      // Reset form and close modal
      reset();
      setOpenCreate(false);
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  return (
    <div className="bg-base-100">
      {/* Header */}
      <div className="border-b bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Teams</h1>
            <p className="text-sm opacity-70">
              Create, filter, and manage teams across your tournaments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn bg-black text-white roboto"
              onClick={() => setOpenCreate(true)}
            >
              Add team
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <label className="input input-bordered flex items-center gap-2 md:max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 opacity-60"
            >
              <path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search teams or captains"
            />
          </label>

          <select
            className="select select-bordered w-full md:w-44"
            value={filterGame}
            onChange={(e) => setFilterGame(e.target.value)}
          >
            <option>All</option>
            {games.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full md:w-44"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Newest</option>
            <option>Name A-Z</option>
            <option>Members</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-10">
        <ul className={"space-y-3 grid grid-cols-1 lg:grid-cols-2 gap-3"}>
          {filtered.map((t) => (
            <li
              key={t.id}
              className="grid grid-cols-2 h-full sm:grid-cols-6 gap-3 items-center bg-base-100 rounded-xl p-4 border"
            >
              <div className="sm:col-span-3">
                <div className="font-medium flex items-center gap-2">
                  <div className="bg-black text-white text-center place-content-center rounded-xl w-8 h-8">
                    <span className="text-sm font-bold">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {t.name}
                </div>
                <div className="text-sm opacity-70 flex items-center gap-2 mt-1">
                  <span className="badge badge-outline badge-sm">
                    {t.game || "Unknown"}
                  </span>
                  <span className="badge badge-sm">
                    {t.membersCount || t.members.length} members
                  </span>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  Captain: {t.captain || "No captain"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-sm opacity-70">ID</div>
                <div className="font-mono text-xs truncate">{t.id}</div>
                <div className="text-xs opacity-70 mt-1">
                  Created: {t.createdAt}
                </div>
              </div>
              <div className="sm:col-span-1 text-right">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setInspectTeam(t)}
                >
                  Manage
                </button>
              </div>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="col-span-full">
              <div className="alert">
                <span>
                  No teams match your filters. Try clearing search or filters.
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Create Team Modal */}
      <div className={`modal ${openCreate ? "modal-open" : ""}`}>
        <div className="modal-box max-w-3xl">
          <h3 className="font-semibold text-xl">Create a team</h3>
          <p className="text-sm opacity-70 mb-4">
            Add a team with members. You can edit later from Manage.
          </p>

          <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Team name</span>
                </div>
                <input
                  className="input input-bordered"
                  type="text"
                  {...register("name", { required: "Required", minLength: 2 })}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Game</span>
                </div>
                <select
                  className="select select-bordered"
                  {...register("game", { required: true })}
                >
                  {games.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Captain</span>
              </div>
              <input
                className="input input-bordered ml-1"
                type="text"
                placeholder="Who leads the team?"
                {...register("captain")}
              />
            </label>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="label p-0">
                  <span className="label-text">Members</span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => append({ name: "" })}
                >
                  Add member
                </button>
              </div>
              <div className="space-y-2">
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      className="input input-bordered w-full"
                      placeholder={`Member #${idx + 1} name`}
                      {...register(`members.${idx}.name`)}
                    />
                    <button
                      type="button"
                      className="btn btn-square"
                      onClick={() => remove(idx)}
                      title="Remove"
                    >
                      <BsX />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setOpenCreate(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create team"}
              </button>
            </div>
          </form>
        </div>
        <div
          className="modal-backdrop"
          onClick={() => setOpenCreate(false)}
        ></div>
      </div>

      {/* Inspect / Manage modal */}
      <div className={`modal ${inspectTeam ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          {inspectTeam && (
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-xl">{inspectTeam.name}</h3>
                  <div className="text-sm opacity-70">
                    Captain: {inspectTeam.captain || "—"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="badge badge-outline mr-1">
                    {inspectTeam.game || "Unknown"}
                  </div>
                  <div className="badge badge-neutral">
                    {inspectTeam.membersCount || inspectTeam.members.length}{" "}
                    members
                  </div>
                </div>
              </div>

              <div className="divider m-0"></div>

              <ul className="space-y-1">
                {inspectTeam.members.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="badge badge-xs"></span>
                    <span>{m}</span>
                  </li>
                ))}
                {inspectTeam.members.length === 0 && (
                  <li className="text-sm opacity-70">No members listed.</li>
                )}
              </ul>

              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => setInspectTeam(null)}
                >
                  Close
                </button>
                <button className="btn btn-outline">Go to details</button>
              </div>
            </div>
          )}
        </div>
        <div
          className="modal-backdrop"
          onClick={() => setInspectTeam(null)}
        ></div>
      </div>
    </div>
  );
}
