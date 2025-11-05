import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const players = game.players;

  // Shuffle player order randomly
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  // Assign player numbers and clues
  shuffledPlayers.forEach((player, index) => {
    const playerNumber = index + 1; // 1, 2, or 3
    player.set("playerNumber", playerNumber);

    // Assign clues based on player number
    // Player 1: clues 1-4, Player 2: clues 5-8, Player 3: clues 9-12
    let clueIds;
    if (playerNumber === 1) {
      clueIds = [1, 2, 3, 4];
    } else if (playerNumber === 2) {
      clueIds = [5, 6, 7, 8];
    } else { // playerNumber === 3
      clueIds = [9, 10, 11, 12];
    }

    player.set("clues", clueIds);
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
