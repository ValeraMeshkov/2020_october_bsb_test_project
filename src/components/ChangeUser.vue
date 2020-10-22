<template>
  <div class="user-change">
    <div class="uk-margin-bottom">
      <the-mask
        :mask="getMaskForText"
        :value="user.fio"
        @input="changeFio"
        maxlength="40"
        placeholder="ФИО"
        class="uk-input"
        :class="{
          'uk-form-danger': !validUser.fio
        }"
        :tokens="hexTokens"
      />
    </div>

    <div class="phone uk-margin-bottom">
      <the-mask
        mask="+1 (###) ###-####"
        type="tel"
        class="uk-input"
        :class="{
          'uk-form-danger': !validUser.phone
        }"
        :value="user.phone"
        @input="changePhone"
        placeholder="Введите номер телефона"
      >
      </the-mask>
    </div>

    <div class="uk-margin-bottom">
      <the-mask
        :mask="getMaskForEmail"
        class="uk-input"
        :class="{
          'uk-form-danger': !validUser.email
        }"
        :value="user.email"
        @input="changeEmail"
        placeholder="Email"
        :tokens="hexTokens"
      >
      </the-mask>
    </div>

    <div class="address uk-margin-bottom">
      <p>Адрес проживания</p>

      <the-mask
        class="uk-input uk-margin-bottom"
        :class="{
          'uk-form-danger': !validUser.address.country
        }"
        :mask="getMaskForText"
        :value="user.address.country"
        @input="changeAddressCountry"
        maxlength="15"
        placeholder="Страна"
        :tokens="hexTokens"
      />

      <the-mask
        class="uk-input uk-margin-bottom"
        :class="{
          'uk-form-danger': !validUser.address.city
        }"
        :mask="getMaskForText"
        :value="user.address.city"
        @input="changeAddressCity"
        maxlength="15"
        placeholder="Город"
        :tokens="hexTokens"
      />

      <the-mask
        class="uk-input uk-margin-bottom"
        :class="{
          'uk-form-danger': !validUser.address.street
        }"
        :mask="getMaskForTextWithNumber"
        :value="user.address.street"
        @input="changeAddressStreet"
        maxlength="20"
        placeholder="Улица"
        :tokens="hexTokens"
      />

      <the-mask
        class="uk-input uk-margin-bottom"
        :class="{
          'uk-form-danger': !validUser.address.room
        }"
        mask="####"
        :value="user.address.room"
        @input="changeAddressRoom"
        placeholder="Квартира"
      >
      </the-mask>

      <button class="uk-button uk-button-default" @click="saveUser">
        {{ buttonSave }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { formatPhone, everyFirstLetterUpp } from "@/helpers/helpers.js";

import { mask } from "vue-the-mask";
import { TheMask } from "vue-the-mask";

export default {
  name: "ChangeUser",
  components: {
    TheMask
  },
  directives: {
    mask
  },
  props: {
    buttonSave: {
      type: String,
      default: "Сохранить"
    }
  },
  data() {
    return {
      hexTokens: {
        X: { pattern: /[a-zA-Z а-яА-Я]/ },
        E: { pattern: /[0-9a-zA-Z@.]/ },
        A: { pattern: /[0-9a-zA-Z.,\- а-яА-Я]/ }
      },
      phoneNumbersCount: 17,
      user: {
        fio: null,
        phone: null,
        email: null,
        address: {
          country: null,
          city: null,
          street: null,
          room: null
        }
      },
      validUser: {
        fio: true,
        phone: true,
        email: true,
        address: {
          country: true,
          city: true,
          street: true,
          room: true
        }
      }
    };
  },
  mounted() {
    this.user = JSON.parse(JSON.stringify(this.userState));
  },
  computed: {
    ...mapState({
      userState: state => state.auth.user
    }),
    getMaskForText() {
      return new Array(30).fill("X").join(""); //XXXXX
    },
    getMaskForEmail() {
      return new Array(30).fill("E").join(""); //EEEEE
    },
    getMaskForTextWithNumber() {
      return new Array(20).fill("A").join(""); //AAAAA
    }
  },
  methods: {
    ...mapActions("auth", ["saveUserAuth"]),
    ...mapActions("users", ["addUser"]),
    async saveUser() {
      let checkFields = this.checkFields();
      if (checkFields) {
        await this.saveUserAuth(this.user);
        await this.addUser(this.userState);
        if (this.$route.path === "/auth") {
          this.$router.push("/");
        } else {
          this.$emit("buttonSaveEdit");
        }
      }
    },
    checkFields() {
      if (!this.user.fio) return (this.validUser.fio = false);
      if (
        this.user.phone === null ||
        this.user.phone.length < this.phoneNumbersCount
      )
        return (this.validUser.phone = false);
      if (!this.user.email) return (this.validUser.email = false);
      if (!this.user.address.country)
        return (this.validUser.address.country = false);
      if (!this.user.address.city) return (this.validUser.address.city = false);
      if (!this.user.address.street)
        return (this.validUser.address.street = false);
      if (!this.user.address.room) return (this.validUser.address.room = false);
      return true;
    },
    changeFio(val) {
      let str = everyFirstLetterUpp(val);
      this.validUser.fio = true;
      this.user.fio = str;
    },
    changeEmail(val) {
      this.validUser.email = true;
      this.user.email = val;
    },
    changePhone(val) {
      let phone = formatPhone(val);
      this.validUser.phone = true;
      this.user.phone = phone;
    },
    changeAddressCountry(val) {
      let str = everyFirstLetterUpp(val);
      this.validUser.address.country = true;
      this.user.address.country = str;
    },
    changeAddressCity(val) {
      let str = everyFirstLetterUpp(val);
      this.validUser.address.city = true;
      this.user.address.city = str;
    },
    changeAddressStreet(val) {
      let str = everyFirstLetterUpp(val);
      this.validUser.address.street = true;
      this.user.address.street = str;
    },
    changeAddressRoom(val) {
      this.validUser.address.room = true;
      this.user.address.room = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-change {
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 250px;
  }

  .address {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .phone {
    width: 250px;
    position: relative;
    .uk-input {
      position: relative;
    }
  }
}
</style>
