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

let getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = (ctx, players, times) => {
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

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - CONTENT_GAP
    );

    ctx.fillStyle = `hsl(240, ${Math.round(Math.random()) * 100}%, 50%)`;

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    }

    let playerBar = BAR_HEIGHT * times[i] / maxTime;
    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - CONTENT_GAP - GAP - playerBar,
        BAR_WIDTH,
        playerBar
    );

    ctx.fillStyle = `#000`;
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - CONTENT_GAP - GAP - playerBar - GAP * 2
    );
  }
};
