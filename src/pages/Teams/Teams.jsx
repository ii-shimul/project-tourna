/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { BsX } from "react-icons/bs";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function TeamsPage() {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [openCreate, setOpenCreate] = useState(false);
  const [inspectTeam, setInspectTeam] = useState(null);

  // Load existing teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/teams?user_id=${user.id}`
        );
        const result = await response.json();
        // parse the json members arrays too
        const transformedTeams = result.teams.map((team) => {
          return {
            ...team,
            members: team.members ? JSON.parse(team.members) : [],
          };
        });
        setTeams(transformedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        toast.error("Failed to load teams, please try again later.");
      }
    };
    fetchTeams();
  }, [user, openCreate, inspectTeam]);

  // Filtered/sorted list
  const filtered = useMemo(() => {
    let list = [...teams];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.members[0].toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "Name A-Z":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Members":
        list.sort((a, b) => b.members.length - a.members.length);
        break;
      default:
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return list;
  }, [teams, query, sortBy]);

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
      members: [{ name: "" }, { name: "" }, { name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "members",
    control,
  });

  const onCreate = async (data) => {
    try {
      const memberNames = (data.members || [])
        .map((m) => m.name)
        .filter(Boolean);

      const newTeam = {
        name: data.name,
        owner_user_id: user.id,
        members: memberNames,
      };

      const result = await fetch("http://localhost:3000/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newTeam,
        }),
      });
      if (result.ok) {
        toast.success("Team created successfully");
        reset();
        setOpenCreate(false);
      }
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  const deleteTeam = async (id) => {
    try {
      const result = await fetch(`http://localhost:3000/teams/${id}`, {
        method: "DELETE",
      });
      if (result.ok) {
        toast.success("Team deleted successfully");
        setInspectTeam(null);
      } else {
        toast.error("Failed to delete team.");
      }
    } catch (error) {
      console.log("Error deleting team", error);
      toast.error("Failed to delete team.");
    }
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const teamVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="bg-base-100">
      {/* Header */}
      <motion.div
        className="border-b bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Teams</h1>
            <p className="text-sm opacity-70">
              Create, filter, and manage teams across your tournaments.
            </p>
          </div>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              className="btn bg-black text-white roboto"
              onClick={() => setOpenCreate(true)}
            >
              Add team
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="container mx-auto px-4 py-4"
        initial="hidden"
        animate="visible"
        variants={controlsVariants}
      >
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Newest</option>
            <option>Name A-Z</option>
            <option>Members</option>
          </select>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 pb-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ul className={"space-y-3 grid grid-cols-1 lg:grid-cols-2 gap-3"}>
          {filtered.map((t, index) => (
            <motion.li
              key={t.id}
              className="grid grid-cols-2 h-full sm:grid-cols-6 gap-3 items-center bg-base-100 rounded-xl p-4 border"
              variants={teamVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="sm:col-span-3">
                <div className="font-medium flex items-center gap-2">
                  <motion.div
                    className="bg-black text-white text-center place-content-center rounded-xl w-8 h-8"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-sm font-bold">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                  </motion.div>
                  {t.name}
                </div>
                <div className="text-sm opacity-70 mt-2">
                  <span className="badge badge-outline badge-sm">
                    {t.members_count} members
                  </span>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  Captain: {t.members[0] || "No captain"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-mono text-xs truncate">ID: {t.id}</div>
                <div className="text-xs opacity-70 mt-1">
                  Created: {new Date(t.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="sm:col-span-1 text-right">
                <motion.button
                  className="btn btn-outline btn-sm"
                  onClick={() => setInspectTeam(t)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Details
                </motion.button>
              </div>
            </motion.li>
          ))}

          {filtered.length === 0 && (
            <motion.li
              className="col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="alert">
                <span className="text-lg">
                  No teams found. Try clearing search or filters.
                </span>
              </div>
            </motion.li>
          )}
        </ul>
      </motion.div>

      {/* Create Team Modal */}
      <AnimatePresence>
        {openCreate && (
          <div className="modal modal-open">
            <motion.div
              className="modal-box max-w-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="font-semibold text-xl">Create a team</h3>
              <p className="text-sm opacity-70 mb-4">
                Add a team with members.
              </p>

              <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
                <label className="form-control flex items-center gap-2">
                  <div className="label">
                    <span className="label-text">Team name</span>
                  </div>
                  <motion.input
                    className="input input-bordered w-full"
                    type="text"
                    {...register("name", {
                      required: "Required",
                      minLength: 2,
                    })}
                    whileFocus={{ scale: 1.01 }}
                  />
                </label>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="label p-0">
                      <span className="label-text">
                        Members (First member is the captain)
                      </span>
                    </div>
                    <motion.button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => append({ name: "" })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add member
                    </motion.button>
                  </div>
                  <motion.div
                    className="space-y-2"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {fields.map((field, idx) => (
                      <motion.div
                        key={field.id}
                        className="flex items-center gap-2"
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <input
                          className="input input-bordered w-full"
                          placeholder={`Member #${idx + 1} name`}
                          {...register(`members.${idx}.name`)}
                        />
                        <motion.button
                          type="button"
                          className="btn btn-square"
                          onClick={() => remove(idx)}
                          title="Remove"
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <BsX />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="modal-action">
                  <motion.button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setOpenCreate(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="btn bg-black text-white"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? "Creating..." : "Create team"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
            <div
              className="modal-backdrop"
              onClick={() => setOpenCreate(false)}
            ></div>
          </div>
        )}
      </AnimatePresence>

      {/* View modal */}
      <AnimatePresence>
        {inspectTeam && (
          <div className="modal modal-open">
            <motion.div
              className="modal-box max-w-sm"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">
                      {inspectTeam.name}
                    </h3>
                    <div className="text-sm opacity-70">
                      Captain: {inspectTeam.members[0] || "—"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="badge badge-neutral">
                      {inspectTeam.members_count} members
                    </div>
                  </div>
                </div>

                <div className="divider m-0"></div>

                <motion.ul
                  className="space-y-1"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {inspectTeam.members.map((m, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <span className="badge badge-xs">{i + 1}</span>
                      <span>{m}</span>
                    </motion.li>
                  ))}
                  {inspectTeam.members.length === 0 && (
                    <motion.li
                      className="text-sm opacity-70"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                      No members listed.
                    </motion.li>
                  )}
                </motion.ul>

                <div className="modal-action justify-between">
                  <motion.button
                    onClick={() => deleteTeam(inspectTeam.id)}
                    className="btn btn-warning"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    className="btn btn-ghost"
                    onClick={() => setInspectTeam(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <div
              className="modal-backdrop"
              onClick={() => setInspectTeam(null)}
            ></div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Framer Motion requires AnimatePresence for exit animations
const AnimatePresence = ({ children }) => {
  return children;
};
