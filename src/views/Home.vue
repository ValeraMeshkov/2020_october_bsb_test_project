<template>
  <div class="home">
    <h4>Добро пожаловать {{ user.fio }}</h4>

    <div v-if="edit">
      <ChangeUser @buttonSaveEdit="edit = false" />
    </div>

    <div v-else class="data">
      <button class="correct" uk-icon="pencil" @click="edit = true"></button>

      <p class="info">Ваши заполненные данные</p>
      <div>ФИО: {{ user.fio }}</div>
      <div>Телефон: {{ user.phone }}</div>
      <div>email: {{ user.email }}</div>
      <div>Адрес: {{ getAddress }}</div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChangeUser from "@/components/ChangeUser.vue";

export default {
  name: "Home",
  components: { ChangeUser },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    getAddress() {
      let obj = this.user.address;
      return `${obj.country}, г. ${obj.city}, ул. ${obj.street}, к. ${obj.room}`;
    }
  },
  mounted() {
    if (!this.user.id) this.$router.push("/auth");
  },
  data() {
    return {
      edit: false
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;

  .data {
    margin: 20px;
    max-width: 400px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    text-align: left;
    position: relative;

    .info {
      font-size: 18px;
    }
    .correct {
      position: absolute;
      right: 15px;
      top: 15px;
      transform: scale(1.5);
    }
  }
}
</style>
