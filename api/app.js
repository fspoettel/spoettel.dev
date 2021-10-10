const express = require('express');
const helmet = require('helmet');
const { BIT_MAPPING, retrieveBits, retrieveBitsForType } = require('./bits');
const { errorHandler } = require('./lib/errors');
const { asyncHandler, randomInt } = require('./lib/helpers');
const schedule = require('./lib/schedule');

const app = express();

app.use(helmet());

app.set('port', process.env.PORT || 3001);

app.get(
  '/api/bits',
  asyncHandler(async (req, res) => {
    const bits = await retrieveBits();
    return res.json(bits);
  }),
);

app.get(
  '/api/bits/random',
  asyncHandler(async (req, res) => {
    const categories = await retrieveBits();
    const bits = Object.values(categories).flat();
    if (bits.length === 0) return res.status(404).end();

    return res.json(bits[randomInt(0, bits.length - 1)]);
  }),
);

app.get(
  '/api/bits/:type',
  asyncHandler(async (req, res) => {
    const type = req.params.type;
    const validType = Object.keys(BIT_MAPPING).includes(type);
    if (!validType) return res.status(404).end();

    const bits = await retrieveBitsForType(type, BIT_MAPPING[type], { isForced: false });
    return res.json(bits[type]);
  }),
);

app.use(errorHandler);

schedule(4 * 60 * 60 * 1000, () => retrieveBits({ isForced: true }));

module.exports = app;
