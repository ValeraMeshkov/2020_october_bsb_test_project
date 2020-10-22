export default {
  saveUserAuth(context, data) {
    if (!data.id) {
      data = { ...data, id: String(Math.random()) };
    }
    context.commit("setSaveUserAuth", data);
  }
};
