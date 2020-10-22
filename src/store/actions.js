export default {
  /**
   * Изменение Ширины экрана
   * @param {Object} commit - store
   * @param {Number} value - ширина экрана
   */
  changeWindowWidth(context, value) {
    context.commit("setWindowWidth", value);
  }
};
