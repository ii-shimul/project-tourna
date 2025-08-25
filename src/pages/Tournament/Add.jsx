import React, { useState } from "react";
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

export default function CreateTournamentPage() {
  const { register, handleSubmit, reset, isSubmitting } = useForm();
  const [tournaments, setTournaments] = useState([]);

  const onSubmit = async (data) => {
    console.log("Create tournament payload:", data);
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-10">
        Create your tournament
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="card bg-white">
            <div className="card-body">
              <h2 className="card-title">Make a new tournament</h2>
              <p className="text-sm opacity-70">
                This tournament is waiting for its champions! 🏆 No teams have
                been added yet—gather your squad and be the first to join the
                battle!
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
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
                    className={"input input-bordered w-full mb-4"}
                    {...register("phoneNumber", {
                      required: "Phone is required",
                      minLength: { value: 6, message: "Too short" },
                    })}
                  />
                </label>

                <div className="pt-2">
                  <button
                    className="btn btn-primary w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create your Tournament"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div>
          <div className="card bg-white">
            <div className="card-body">
              <h2 className="card-title">Manage old tournaments</h2>
              <p className="text-sm opacity-70">
                Pay a view your old tournaments into us and you can delete or
                manage your tournament in here. Get the pin code and get access.
              </p>

              <div className="space-y-3 mt-2">
                {tournaments.length ? (
                  tournaments.map((t) => (
                    <div
                      key={t.id}
                      className="grid grid-cols-3 gap-2 items-center"
                    >
                      <div className="col-span-2">
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Tournament name</span>
                          </div>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            defaultValue={t.name}
                            readOnly
                          />
                        </label>
                      </div>
                      <div className="text-right">
                        <button className="btn btn-outline">Manage</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tournaments added yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
