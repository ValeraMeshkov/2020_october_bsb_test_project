<template>
  <div v-if="WINDOW_WIDTH > 1100" class="users">
    <div class="header">
      <div class="fio"><b>ФИО</b></div>
      <div class="phone"><b>Телефон</b></div>
      <div class="email"><b>Почта</b></div>
      <div class="address"><b>Адрес</b></div>
    </div>

    <div v-for="user in users" :key="user.index" class="user">
      <div class="fio">{{ user.fio }}</div>
      <div class="phone">{{ user.phone }}</div>
      <div class="email">{{ user.email }}</div>
      <div class="address">
        {{ getAddress(user.address) }}
      </div>
    </div>
  </div>

  <div v-else class="users-mobile">
    <div v-for="user in users" :key="user.index" class="user">
      <div class="fio"><b>ФИО:</b> {{ user.fio }}</div>
      <div class="phone"><b>Телефон:</b> {{ user.phone }}</div>
      <div class="email"><b>Почта:</b> {{ user.email }}</div>
      <div class="address">
        <b>Адрес:</b>
        {{ getAddress(user.address) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState({
      WINDOW_WIDTH: state => state.WINDOW_WIDTH,
      users: state => state.users.users
    })
  },
  methods: {
    getAddress(adr) {
      return `${adr.country}, г. ${adr.city}, ул. ${adr.street}, к. ${adr.room}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.users {
  margin: 20px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  .user,
  .header {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #000;

    div {
      text-align: left;
      padding: 0 5px;
    }

    .phone {
      width: 200px;
    }
    .fio {
      width: 250px;
    }
    .email {
      width: 300px;
    }
    .info {
      width: 40%;
      display: flex;
      flex-direction: column;
    }

    .address {
      width: 60%;
    }
  }
}
.users-mobile {
  margin: 10px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  .user {
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    border-bottom: 1px solid #000;
  }
}
</style>
