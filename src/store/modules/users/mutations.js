export default {
  setAddUser(state, data) {
    let index = state.users.findIndex(el => el.id === data.id);
    if (index > -1) {
      state.users[index] = data;
    } else {
      state.users.unshift(data);
    }
  }
};
