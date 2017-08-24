module.exports = async ({ buttons: ast }, { buttons: template }, save) => {
  return save(template(''));
};
