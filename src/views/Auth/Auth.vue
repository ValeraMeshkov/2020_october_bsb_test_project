<template>
  <div class="auth">
    <h4>Регистрация</h4>
    <ChangeUser buttonSave="Зарегестрироваться" />
  </div>
</template>

<script>
import ChangeUser from "@/components/ChangeUser.vue";

export default {
  name: "Home",
  components: {
    ChangeUser
  }
};
</script>
