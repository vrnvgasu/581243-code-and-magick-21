'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const CONTENT_GAP = 20;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_HEIGHT = 150;

let renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = (items) => {
  return items.reduce((acc, val) => {
    return acc > val ? acc : val;
  });
};

let renderResultCloud = (ctx) => {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + CONTENT_GAP,
      CLOUD_Y + CONTENT_GAP
  );
  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + CONTENT_GAP,
      CLOUD_Y + CONTENT_GAP * 2
  );
};

let renderBar = (ctx, playerBar, i, time) => {
  ctx.fillRect(
      CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
      CLOUD_HEIGHT - CONTENT_GAP - GAP - playerBar,
      BAR_WIDTH,
      playerBar
  );

  ctx.fillStyle = `#000`;
  ctx.fillText(
      Math.round(time),
      CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
      CLOUD_HEIGHT - CONTENT_GAP - GAP - playerBar - GAP * 2
  );
};

let defineColumnColor = (ctx, player) => {
  let color = `hsl(240, ${Math.round(Math.random()) * 100}%, 50%)`;

  if (player === `Вы`) {
    color = `rgba(255, 0, 0, 1)`;
  }

  return color;
};

let renderPlayer = (ctx, player, i) => {
  ctx.fillStyle = `#000`;
  ctx.fillText(
      player,
      CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
      CLOUD_HEIGHT - CONTENT_GAP
  );
};

let renderResultDiagram = (ctx, players, times) => {
  let maxTime = getMaxElement(times);

  players.forEach((player, i) => {
    renderPlayer(ctx, players, i);

    ctx.fillStyle = defineColumnColor(ctx, player);

    let playerBar = BAR_HEIGHT * times[i] / maxTime;

    renderBar(ctx, playerBar, i, times[i]);
  });
};

window.renderStatistics = (ctx, players, times) => {
  renderResultCloud(ctx);
  renderResultDiagram(ctx, players, times);
};
