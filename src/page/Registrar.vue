<template>
    <Breadcrum :name="breadCrumUrl"></Breadcrum>
    <div class="py-[4rem] bg-[#0798ca30]">
        <div class="max-w-screen-xl md:mx-auto px-[3rem] ">
            <h1 class=" md:flex block items-center gap-[3rem] text-left text-[2rem] text-[#18489b] font-[emoji]">
                Register


            </h1>

        </div>

    </div>
    <div class="max-w-screen-xl md:mx-auto p-[3rem] bg-gray-50 my-[1rem] rounded-lg">

        <form class="text-left">
            <div class="grid gap-6 mb-6 md:grid-cols-2 text-left ">
                <div class="">
                    <label for="first_name" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">First
                        name<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <input type="text" id="first_name" name="first_name"
                        @input="event => first_name = event.target.value"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:ring-[0px]"
                        placeholder="John" required />
                    <span
                        :class="[MessageFirstName === true ? 'block text-[12px] text-red-500 flex gap-2 items-center' : 'hidden']">
                        <FontAwesomeIcon :icon="faCircleXmark" class="mb-0" />
                        The field First Name is empty
                    </span>
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Last
                        name<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <input type="text" id="last_name" name="last_name" @input="event => last_name = event.target.value"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:ring-[0px]"
                        placeholder="Doe" required />
                </div>

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2 text-left">
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Phone
                        number<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <input type="tel" id="phone" @input="event => phone = event.target.value"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 "
                        placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Email
                        address<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <input type="email" id="email" name="email" @input="event => email = event.target.value"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 "
                        placeholder="john.doe@company.com" required />
                    <span
                        :class="[MessageEmail === true ? 'block text-[12px] text-red-500 flex gap-2 items-center' : 'hidden']">
                        <FontAwesomeIcon :icon="faCircleXmark" class="mb-0" />
                        The field Email is empty
                    </span>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2 text-left">
                <div>
                    <label for="Gender" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Gender
                        <sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <div class="flex gap-2 items-center">
                        <input type="radio" name="gender" id="one" value="F" v-model="picked" />
                        <label for="one">One</label>

                        <input type="radio" name="gender" id="two" value="Two" v-model="picked" />
                        <label for="two">Two</label>

                    </div>
                </div>
                <div>

                    <label for="email" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Age<sup
                            class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <input type="Number" min="0" v-model="age"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 "
                        placeholder="john.doe@company.com" required />
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2 text-left">
                <div>
                    <label for="password"
                        class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Password<sup
                            class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <div class="flex items-center ">
                        <input v-bind:type="viewPassword === false ? 'password' : 'text'" id="password" name="password"
                            @input="event => password = event.target.value"
                            :class="[confirm_password !== false ? ' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg border-r-[0px] focus:ring-[0px] block w-full p-2.5 ' : 'z-10 bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg   block w-full p-2.5 focus:ring-[0px]']"
                            placeholder="•••••••••" required />
                        <input id="passwordview" type="checkbox" checked name="check_password"
                            @click="viewPasswords(check_password)"
                            @input="event => check_password = event.target.checked"
                            class=" border-l-[0px] w-4 h-[2.6rem] border border-gray-300 focus:ring-[0px] rounded-r-lg bg-gray-50 focus:ring-offset-[0px] "
                            required />
                    </div>
                </div>
                <div>
                    <label for="confirm_password"
                        class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Confirm password<sup
                            class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                    <div class="flex items-center ">
                        <input v-bind:type="viewConfirmPassword === false ? 'password' : 'text'" id="confirm_password"
                            name="confirm_password" @input="event => confirm_password = event.target.value"
                            :class="[confirm_password !== false ? ' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg border-r-[0px] focus:ring-[0px] block w-full p-2.5 ' : 'z-10 bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg   block w-full p-2.5 focus:ring-[0px]']"
                            placeholder="•••••••••" required />
                        <input id="passwordview" type="checkbox" checked name="check_password"
                            @click="viewConfirmPasswords(check_confirm_password)"
                            @input="event => check_confirm_password = event.target.checked"
                            class=" border-l-[0px] w-4 h-[2.6rem] border border-gray-300 focus:ring-[0px] rounded-r-lg bg-gray-50 focus:ring-offset-[0px] "
                            required />
                    </div>
                </div>
            </div>
            <div class="flex items-start mb-2">
                <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" name="check_confirm" @click="confirmaRegistred(check_confirm)"
                        @input="event => check_confirm = event.target.checked"
                        class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required />
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the
                    <router-link to="/terminos" class="text-blue-600 hover:underline dark:text-blue-500">terms and
                        conditions</router-link>.</label>

            </div>
            <div class="flex items-start mb-6">
                <label class="text-sm font-medium text-gray-900">Los campos que poseen <strong
                        class="text-red-500">*</strong> son campos obligatorios</label>
            </div>
            <button type="button" @click="SendDataUser(first_name, last_name, email, phone, password, confirm_password)"
                :disabled="confirm == true ? '' : disabled"
                class="bg-white text-[#053593] border-[#053593] border-[1px] hover:bg-[#053593] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
        </form>
    </div>
</template>
<script>
import Breadcrum from '../components/Breadcrum.vue';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import CryptoJS from 'crypto-js'
import {
    initAccordions,
    initCarousels,
    initCollapses,
    initDials,
    initDismisses,
    initDrawers,
    initDropdowns,
    initModals,
    initPopovers,
    initTabs,
    initTooltips
} from 'flowbite'
// import crypto from 'crypto';
export default {
    name: 'Registrar',
    data() {
        return {
            getData: '',
            setData: [],
            confirm: true,
            confirm_password: '',
            algorithm: 'aes-256-cbc',
            breadCrumUrl: '',
            fetch: [],
            titulo: 'registrar',
            faCircleXmark: faCircleXmark,
            MessageEmail: false,
            MessageCompany: false,
            MessagePhone: false,
            MessageLastName: false,
            MessageUserName: false,
            MessageFirstName: false,
            MessagePassword: false,
            viewPassword: false,
            viewConfirmPassword: false

        }
    },

    methods: {
        viewConfirmPasswords(items) {

            this.viewConfirmPassword = items

        },
        viewPasswords(item) {
            this.viewPassword = item
        },
        confirmaRegistred(confirm) {
            this.confirm = confirm;
        },

        async SendDataUser(first_name, last_name, email, phone, password, confirm_password) {
            if (first_name === undefined) {
                this.MessageFirstName = true
            } else {
                this.MessageFirstName = false
            }

            this.setData = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    firstName: first_name,
                    lastName: last_name,
                    age: 28,
                    gender: "female",
                    email: email,
                    phone: phone,
                    username: first_name,
                    password: confirm_password

                }),

            }).then((response) => response.json()).then((json) => this.setData = json);
            this.getData.push(this.setData);
            this.getData;
            this.confirm_password = password == confirm_password ? true : false;
            if (this.confirm_password == true) {
                /*  const clave_privada=''
                   const  hashDigest  =  sha256 (confirm_password) ; 
                   const  hmacDigest  =  Base64.stringify ( hmacSHA512 (hashDigest , clave_privada ) ) ;
                   */
                // Encrypt
                var ciphertext = CryptoJS.AES.encrypt(confirm_password, 'secret key 123');
                ciphertext
                // Decrypt
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);

            }
            else {
                console.log('incorrect password');
            }


        },
        async encrypt_data() {

            this.fetch = await fetch('https://dummyjson.com/users');
            this.fetch = this.fetch.json();


        },
        async getDataUser() {
            const response = await fetch('https://dummyjson.com/users');
            const users = await response.json();
            this.getData = users.users;

        },
        updateUrl() {
            const mensaje = "mensaje desde el servidor"
            const nonce = ''
            const ruta = ''
            const clave_privada = '';  // ... 

            const url = window.location;
            this.breadCrumUrl = url.hash.split("/");
            return this.breadCrumUrl;
        },

    },
    components: {
        Breadcrum
    },
    mounted() {

        this.updateUrl();
        this.encrypt_data();
        this.getDataUser()
        initAccordions();
        initCarousels();
        initCollapses();
        initDials();
        initDismisses();
        initDrawers();
        initDropdowns();
        initModals();
        initPopovers();
        initTabs();
        initTooltips();

    }
}

</script>
<style>
[id="passwordview"] {
    background-image: url('../assets/eye-regular.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 1.2rem;
    padding: 0px;
    width: 28px;
    background-position-x: 0px;
}

[id="passwordview"]:checked {
    background-image: url('../assets/eye-slash-regular.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 1.2rem;
    padding: 0px;
    border: 1px #d1d5db solid;
    border-left: 0px;
    width: 28px;
    background-position-x: 0px;
    background-color: transparent;
}

[type='text']:focus,
[type='email']:focus,
[type='url']:focus,
[type='password']:focus,
[type='number']:focus,
[type='date']:focus,
[type='datetime-local']:focus,
[type='month']:focus,
[type='search']:focus,
[type='tel']:focus,
[type='time']:focus,
[type='week']:focus,
[multiple]:focus,
textarea:focus,
select:focus {

    border-color: #284a6b1f !important;
    border-right: none;
}

input:autofill {
    appearance: menulist-button;
    background-image: none !important;
    background-color: rgb(15 44 94) !important;
    color: fieldtext !important;
}
</style>