export default {
  addUser(context, data) {
    context.commit("setAddUser", data);
  }
};
