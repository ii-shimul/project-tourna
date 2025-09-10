/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext";
import { motion } from "framer-motion";

// Utilities to construct and update a single-elimination bracket (DB schema)
function nextPowerOfTwo(n) {
  if (n < 1) return 1;
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

function generateDbSchemaMatches(teamIds) {
  const size = nextPowerOfTwo(teamIds.length);
  const seeds = [...teamIds, ...Array(size - teamIds.length).fill(null)];

  let matchId = 1;
  let round = 1;

  // Build round 1
  let roundMatches = [];
  for (let i = 0; i < size; i += 2) {
    roundMatches.push({
      match_id: matchId++,
      round,
      slot: i / 2 + 1,
      status: "scheduled",
      participants: [
        { side: 1, team_id: seeds[i], score: 0, is_winner: 0 },
        { side: 2, team_id: seeds[i + 1], score: 0, is_winner: 0 },
      ],
      next_match_id: null,
      next_slot: null,
    });
  }

  const allRounds = [roundMatches];
  // Build subsequent rounds and link
  while (roundMatches.length > 1) {
    round += 1;
    const nextRound = [];
    for (let i = 0; i < roundMatches.length; i += 2) {
      const parent = {
        match_id: matchId++,
        round,
        slot: i / 2 + 1,
        status: "scheduled",
        participants: [
          { side: 1, team_id: null, score: 0, is_winner: 0 },
          { side: 2, team_id: null, score: 0, is_winner: 0 },
        ],
        next_match_id: null,
        next_slot: null,
      };
      // Link children to this parent
      roundMatches[i].next_match_id = parent.match_id;
      roundMatches[i].next_slot = 1;
      roundMatches[i + 1].next_match_id = parent.match_id;
      roundMatches[i + 1].next_slot = 2;
      nextRound.push(parent);
    }
    allRounds.push(nextRound);
    roundMatches = nextRound;
  }

  // Auto-advance byes
  const flat = allRounds.flat();
  const byId = Object.fromEntries(flat.map((m) => [m.match_id, m]));
  for (const m of flat) {
    const [a, b] = m.participants;
    const aHas = !!a.team_id;
    const bHas = !!b.team_id;
    if ((aHas && !bHas) || (!aHas && bHas)) {
      const winner = aHas ? a.team_id : b.team_id;
      if (winner && m.next_match_id) {
        const parent = byId[m.next_match_id];
        const slotIndex = (m.next_slot || 1) - 1;
        parent.participants[slotIndex].team_id = winner;
      }
    }
  }

  const root_match_id = allRounds[allRounds.length - 1][0].match_id;
  return { meta: { root_match_id, next_local_id: matchId }, matches: flat };
}

function buildRoundsFromDb(matches) {
  const byRound = new Map();
  for (const m of matches) {
    if (!byRound.has(m.round)) byRound.set(m.round, []);
    byRound.get(m.round).push(m);
  }
  return Array.from(byRound.keys())
    .sort((a, b) => a - b)
    .map((r) => byRound.get(r));
}

export default function TournamentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { user } = useContext(AuthContext);

  const teamMap = useMemo(() => {
    const map = new Map();
    for (const t of teams) map.set(t.id, t);
    return map;
  }, [teams]);

  const loadTournament = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tournaments/${id}`);
      const json = await res.json();
      let t = json.tournament[0] || json;
      if (typeof t.data_json === "string") {
        try {
          t.data_json = JSON.parse(t.data_json);
        } catch {
          t.data_json = { teams: [], matches: [] };
        }
      }
      setTournament(t);
    } catch (e) {
      console.error("Failed to load tournament", e);
      toast.error("Failed to load tournament");
    }
  };

  const loadTeamsForTournament = async (teamIds) => {
    try {
      if (!Array.isArray(teamIds) || teamIds.length === 0) {
        setTeams([]);
        return;
      }
      const res = await fetch(`http://localhost:3000/teams?user_id=${user.id}`);
      const json = await res.json();
      setTeams(json.teams.filter((t) => teamIds.includes(t.id)));
    } catch (e) {
      console.error("Failed to load teams", e);
      toast.error("Failed to load teams");
    }
  };

  useEffect(() => {
    loadTournament();
  }, [id]);

  useEffect(() => {
    if (!tournament) return;
    const ids = tournament?.data_json?.teams || [];
    loadTeamsForTournament(ids);
  }, [tournament]);

  // Initialize matches if empty (DB schema)
  useEffect(() => {
    if (!tournament) return;
    const ids = tournament?.data_json?.teams || [];
    const matches = tournament?.data_json?.matches || [];
    if (ids.length > 1 && matches.length === 0) {
      const generated = generateDbSchemaMatches(ids);
      setTournament((prev) => ({
        ...prev,
        data_json: { ...prev.data_json, ...generated },
      }));
    }
  }, [tournament?.id]);

  const internalRounds = useMemo(() => {
    const matches = tournament?.data_json?.matches || [];
    return buildRoundsFromDb(matches);
  }, [tournament?.data_json?.matches]);

  // Round titles based on total rounds
  const roundTitles = useMemo(() => {
    const total = internalRounds.length;
    if (total === 1) return ["Final"];
    if (total === 2) return ["Semifinal", "Final"];
    if (total === 3) return ["Quarterfinal", "Semifinal", "Final"];
    if (total === 4)
      return ["Round of 16", "Quarterfinal", "Semifinal", "Final"];
    return Array.from({ length: total }, (_, i) => `Round ${i + 1}`);
  }, [internalRounds.length]);

  const saveBracket = async (nextTournament) => {
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:3000/tournaments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data_json: nextTournament.data_json,
          status: nextTournament.status,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
    } catch (e) {
      console.error("Failed to save bracket", e);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const deleteTournament = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this tournament? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      setDeleting(true);
      const res = await fetch(`http://localhost:3000/tournaments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Tournament deleted");
      navigate("/tournaments");
    } catch (e) {
      console.error("Failed to delete tournament", e);
      toast.error("Failed to delete tournament");
    } finally {
      setDeleting(false);
    }
  };

  const handlePickWinner = (match, winnerTeamId) => {
    const current = structuredClone(tournament);
    const matches = current.data_json.matches;
    const byId = Object.fromEntries(matches.map((m) => [m.match_id, m]));

    const m = byId[match.match_id];
    // Update winner flags
    for (const p of m.participants)
      p.is_winner = p.team_id === winnerTeamId ? 1 : 0;

    // Propagate to next match
    if (m.next_match_id) {
      const parent = byId[m.next_match_id];
      const slotIndex = (m.next_slot || 1) - 1; // 0 or 1
      parent.participants[slotIndex].team_id = winnerTeamId;
      parent.participants[slotIndex].score = 0;
      parent.participants[slotIndex].is_winner = 0;
      // Clear conflicting winner
      for (const p of parent.participants) {
        if (p.is_winner && p.team_id !== winnerTeamId) p.is_winner = 0;
      }
    }

    // Update terminal status
    const finalRound = Math.max(...matches.map((x) => x.round));
    const finalMatch = matches.find(
      (x) => x.round === finalRound && !x.next_match_id
    );
    const hasWinner = finalMatch?.participants?.some((p) => p.is_winner === 1);
    if (hasWinner) {
      current.status = "finished";
    } else if (current.status === "upcoming") {
      current.status = "ongoing";
    }

    setTournament(current);
    saveBracket(current);
  };

  const championTeam = useMemo(() => {
    if (!tournament) return null;
    const matches = tournament?.data_json?.matches || [];
    if (matches.length === 0) return null;
    const lastRound = Math.max(...matches.map((m) => m.round));
    const finalMatch = matches.find(
      (m) => m.round === lastRound && !m.next_match_id
    );
    if (!finalMatch) return null;
    const winner = finalMatch.participants.find((p) => p.is_winner === 1);
    if (!winner?.team_id) return null;
    return teamMap.get(winner.team_id) || null;
  }, [tournament, teamMap]);

  return (
    <motion.div
      className="bg-base-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold">
              {tournament?.name || "Tournament"}
            </h1>
            <div className="text-sm opacity-70">
              {tournament?.format === "single_elimination"
                ? "Single Elimination"
                : "Round Robin"}
              <span
                className={`ml-2 badge badge-sm ${
                  tournament?.status === "upcoming"
                    ? "badge-primary"
                    : tournament?.status === "ongoing"
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {tournament?.status}
              </span>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              className="btn btn-outline"
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
            <motion.button
              className="btn"
              disabled={saving}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {saving ? "Saving..." : "Saved"}
            </motion.button>
            <motion.button
              className="btn btn-error"
              disabled={deleting}
              onClick={deleteTournament}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {deleting ? "Deleting..." : "Delete"}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tournament Info */}
        {tournament && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="card bg-base-200 shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="card-body p-4">
                <h3 className="card-title text-sm">Start Date</h3>
                <p className="text-lg font-semibold">
                  {tournament.start_date
                    ? new Date(tournament.start_date).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="card bg-base-200 shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="card-body p-4">
                <h3 className="card-title text-sm">Format</h3>
                <p className="text-lg font-semibold">
                  {tournament.format === "single_elimination"
                    ? "Single Elimination"
                    : "Round Robin"}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="card bg-base-200 shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="card-body p-4">
                <h3 className="card-title text-sm">Teams</h3>
                <p className="text-lg font-semibold">
                  {tournament.data_json?.teams?.length || 0}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="card bg-base-200 shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="card-body p-4">
                <h3 className="card-title text-sm">Matches</h3>
                <p className="text-lg font-semibold">
                  {tournament.data_json?.matches?.length || 0}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {tournament?.data_json?.teams?.length < 2 && (
          <div className="alert mb-4">
            <span>Add at least two teams to generate a bracket.</span>
          </div>
        )}

        {internalRounds.length > 0 && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {internalRounds.map((round, idx) => (
              <motion.div
                key={idx}
                className="space-y-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              >
                <motion.div
                  className="card bg-base-200 shadow"
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div className="card-body py-3 px-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{roundTitles[idx]}</h3>
                      <span className="badge badge-neutral">
                        {round.length}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {round.map((m, matchIdx) => {
                  const a = m.participants[0];
                  const b = m.participants[1];
                  const aName = a?.team_id
                    ? teamMap.get(a.team_id)?.name || `Team ${a.team_id}`
                    : "— bye —";
                  const bName = b?.team_id
                    ? teamMap.get(b.team_id)?.name || `Team ${b.team_id}`
                    : "— bye —";
                  return (
                    <motion.div
                      key={m.match_id}
                      className="card bg-base-100 border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.6 + idx * 0.1 + matchIdx * 0.05,
                      }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="card-body p-4">
                        <div className="text-xs opacity-70 mb-1">
                          Match #{m.match_id}
                        </div>
                        <div className="space-y-2">
                          <motion.button
                            className={`w-full btn btn-sm justify-between ${
                              a?.is_winner ? "btn-primary" : "btn-outline"
                            }`}
                            disabled={!a?.team_id}
                            onClick={() =>
                              a?.team_id && handlePickWinner(m, a.team_id)
                            }
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="truncate text-left">{aName}</span>
                            {a?.is_winner ? (
                              <span className="badge badge-xs">WIN</span>
                            ) : null}
                          </motion.button>
                          <motion.button
                            className={`w-full btn btn-sm justify-between ${
                              b?.is_winner ? "btn-primary" : "btn-outline"
                            }`}
                            disabled={!b?.team_id}
                            onClick={() =>
                              b?.team_id && handlePickWinner(m, b.team_id)
                            }
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="truncate text-left">{bName}</span>
                            {b?.is_winner ? (
                              <span className="badge badge-xs">WIN</span>
                            ) : null}
                          </motion.button>
                        </div>
                        <div className="divider my-2"></div>
                        <div className="text-xs flex items-center justify-between">
                          <span>Winner:</span>
                          <span className="font-medium">
                            {a?.is_winner
                              ? aName
                              : b?.is_winner
                              ? bName
                              : "TBD"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}

            {/* Champion card */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="card bg-base-200 shadow"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="card-body py-3 px-4">
                  <h3 className="font-semibold">Champion</h3>
                </div>
              </motion.div>
              <motion.div
                className="card bg-base-100 border"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="card-body items-center">
                  <motion.div
                    className="text-2xl font-extrabold tracking-wide"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    {championTeam?.name || "—"}
                  </motion.div>
                  <div className="text-xs opacity-60">
                    {championTeam ? "Congratulations!" : "Awaiting results"}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
