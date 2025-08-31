import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

// Select options
const games = [
  { label: "Football", value: "Football" },
  { label: "Cricket", value: "Cricket" },
  { label: "Basketball", value: "Basketball" },
  { label: "eSports", value: "eSports" },
  { label: "Volleyball", value: "Volleyball" },
];

// Seeded demo data (replace with fetch when backend is ready)
const seededTeams = [
  {
    id: "tm-101",
    name: "Crimson Hawks",
    game: "Football",
    captain: "Arif Rahman",
    members: [
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
    ],
    createdAt: "2025-08-01",
  },
  {
    id: "tm-102",
    name: "Pixel Ninjas",
    game: "eSports",
    captain: "Nadia Noor",
    members: ["Nadia Noor", "Rafi", "Javed", "Pinky", "Sifat"],
    createdAt: "2025-08-12",
  },
  {
    id: "tm-103",
    name: "Skyline Shooters",
    game: "Basketball",
    captain: "Tahsin Ahmed",
    members: ["Tahsin", "Sakib", "Ahsan", "Neil", "Oyon"],
    createdAt: "2025-07-18",
  },
  {
    id: "tm-104",
    name: "Green Strikers",
    game: "Cricket",
    captain: "Mizan Karim",
    members: [
      "Mizan",
      "Raju",
      "Anik",
      "Kamal",
      "Rony",
      "Omar",
      "Sajib",
      "Imran",
      "Rifat",
      "Tuhin",
      "Parvez",
    ],
    createdAt: "2025-06-05",
  },
];

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState("");
  const [filterGame, setFilterGame] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [view, setView] = useState("grid");
  const [openCreate, setOpenCreate] = useState(false);
  const [inspectTeam, setInspectTeam] = useState(null);

  // Load existing teams on mount
  useEffect(() => {
    setTeams(seededTeams);
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
      game: games[0].value,
      captain: "",
      members: [{ name: "" }, { name: "" }, { name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "members",
    control,
  });
  // Above trick avoids TS complaints in plain JS projects; if using TS, pass the control from useForm.

  const onCreate = async (data) => {
    // Compose team object and optimistically add
    const mems = (data.members || []).map((m) => m.name).filter(Boolean);
    const item = {
      id: `tm-${Date.now()}`,
      name: data.name,
      game: data.game,
      captain: data.captain || mems[0] || "",
      members: mems,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTeams((prev) => [item, ...prev]);
    reset();
    setOpenCreate(false);
  };

  return (
    <div className="min-h-screen bg-base-100">
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
              className={`btn btn-square ${
                view === "grid" ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => setView("grid")}
              title="Grid view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
              </svg>
            </button>
            <button
              className={`btn btn-square ${
                view === "list" ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => setView("list")}
              title="List view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
            </button>
            <button
              className="btn btn-primary"
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
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-3"
          }`}
        >
          {filtered.map((t) =>
            view === "grid" ? (
              <article key={t.id} className="card bg-base-200 shadow">
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-xl w-12">
                          <span className="text-lg font-bold">
                            {t.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {t.name}
                        </h3>
                        <div className="text-sm opacity-70">
                          Captain: {t.captain}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="badge badge-outline mr-1">{t.game}</div>
                      <div className="badge badge-neutral">
                        {t.members.length} members
                      </div>
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setInspectTeam(t)}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <article key={t.id} className="bg-base-200 rounded-xl p-4 border">
                <div className="grid grid-cols-6 gap-3 items-center">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-xl w-10">
                        <span className="font-bold">
                          {t.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm opacity-70">
                        Captain: {t.captain}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="badge badge-outline">{t.game}</div>
                    <div className="badge badge-neutral">
                      {t.members.length} members
                    </div>
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setInspectTeam(t)}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </article>
            )
          )}

          {filtered.length === 0 && (
            <div className="col-span-full">
              <div className="alert">
                <span>
                  No teams match your filters. Try clearing search or filters.
                </span>
              </div>
            </div>
          )}
        </div>
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
                <span className="label-text">Captain (optional)</span>
              </div>
              <input
                className="input input-bordered"
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
                      className="btn btn-ghost btn-square"
                      onClick={() => remove(idx)}
                      title="Remove"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                      >
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
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
                    {inspectTeam.game}
                  </div>
                  <div className="badge badge-neutral">
                    {inspectTeam.members.length} members
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
