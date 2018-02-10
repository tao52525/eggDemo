'use strict'

module.exports = options => {
  return async function saveSession(ctx, next) {
    await next();
    if (!ctx.session.populated) return;
    ctx.session.save();
  };
};
