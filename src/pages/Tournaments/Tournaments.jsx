import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const styles = [
  { label: "Knockout", value: "Knockout" },
  { label: "League", value: "League" },
  { label: "Round Robin", value: "Round Robin" },
];

const lengths = [
  { label: "Day", value: "Day" },
  { label: "Week", value: "Week" },
  { label: "Month", value: "Month" },
];

const seededTournaments = [
  { id: "t-1001", name: "Project Alpha", style: "Knockout" },
  { id: "t-1002", name: "Weekend League", style: "League" },
  { id: "t-1003", name: "Rounders Cup", style: "Round Robin" },
];

export default function CreateTournamentPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [tournaments, setTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTournaments(seededTournaments);
  }, []);

  const onSubmit = async (data) => {
    console.log("Create tournament payload:", data);

    const newItem = {
      id: `t-${Date.now()}`,
      name: data?.name || "Untitled",
      style: data?.style || "",
    };
    setTournaments((prev) => [newItem, ...prev]);

    reset();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-base-100">
      <div className="border-b bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-medium">Tournaments</h1>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-outline"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
            <button
              className="btn btn-primary"
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
                        <div className="text-sm opacity-70">{t.style}</div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="text-sm opacity-70">ID</div>
                        <div className="font-mono text-xs truncate">{t.id}</div>
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button className="btn btn-outline btn-sm">
                          Manage
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
                <li>Wire the submit handler to your API when ready.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          <h3 className="font-semibold text-xl mb-2">Create a tournament</h3>
          <p className="text-sm opacity-70 mb-4">
            Fill in the details below and submit to create your tournament.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Tournament name</span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: 3,
                  })}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Team size</span>
                </div>
                <input
                  type="number"
                  className={"input input-bordered w-full"}
                  min={2}
                  {...register("teamSize", {
                    required: "Team size is required",
                    valueAsNumber: true,
                    min: { value: 2, message: "Minimum 2" },
                  })}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Tournament style</span>
                </div>
                <select
                  className="select select-bordered"
                  {...register("style", { required: true })}
                >
                  {styles.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Tournament length</span>
                </div>
                <select
                  className="select select-bordered"
                  {...register("length", { required: true })}
                >
                  {lengths.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Organizer phone number</span>
              </div>
              <input
                type="tel"
                className={"input input-bordered w-full"}
                {...register("phoneNumber", {
                  required: "Phone is required",
                  minLength: { value: 6, message: "Too short" },
                })}
              />
            </label>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
        <div
          className="modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        ></div>
      </div>
    </div>
  );
}
