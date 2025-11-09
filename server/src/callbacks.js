import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const players = game.players;

  // Shuffle player order randomly
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  // Assign player numbers, types, and clues
  // Type A: players 1 and 2 (get different info)
  // Type B: players 3 and 4 (get same info)
  shuffledPlayers.forEach((player, index) => {
    const playerNumber = index + 1; // 1, 2, 3, or 4
    player.set("playerNumber", playerNumber);

    // Assign player type (A or B)
    const playerType = playerNumber <= 2 ? "A" : "B";
    player.set("playerType", playerType);

    // Assign clues based on player number
    // Player 1 (Type A): clues 1-4
    // Player 2 (Type A): clues 5-8
    // Player 3 (Type B): clues 9-12
    // Player 4 (Type B): clues 9-12 (same as player 3)
    let clueIds;
    if (playerNumber === 1) {
      clueIds = [1, 2, 3, 4];
    } else if (playerNumber === 2) {
      clueIds = [5, 6, 7, 8];
    } else { // playerNumber === 3 or 4 (both Type B get same clues)
      clueIds = [9, 10, 11, 12];
    }

    player.set("clues", clueIds);
  });

  // Set up cross-type chat peers for each player
  // Each player can only chat with players of the opposite type
  shuffledPlayers.forEach((player) => {
    const myType = player.get("playerType");
    const chatPeers = shuffledPlayers
      .filter(p => p.get("playerType") !== myType)
      .map(p => p.id);
    player.set("chatPeers", chatPeers);
  });

  const round = game.addRound({
    name: "Consulting Task",
    task: "consulting",
  });
  round.addStage({ name: "Discussion", duration: 3000 });
  round.addStage({ name: "Submit", duration: 120 });
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
