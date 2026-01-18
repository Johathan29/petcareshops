<template>
<BreadCrum :name="breadCrumUrl" v-if="breadCrumUrl[1]!==''"></BreadCrum>

<div class="py-[4rem] bg-[#0798ca30]">
    <div class="max-w-screen-xl md:mx-auto px-5 ">
        <h1 class=" md:flex block items-center gap-[3rem] text-left text-[2rem] text-[#18489b] font-[emoji]">
          <span :class="[breadCrumUrl[1]!==''?'md:w-[25%] w-full border-r-[2px] border-gray-300':'md:w-[25%] w-full ']">
            Users List
          </span> 
          <div class="relative z-0  mb-2 group md:w-[75%] w-full " v-if="breadCrumUrl[1]!==''">
                <input type="search" name="search_users" v-model="search_users" @keyup="search(search_users)" @input="event => search_users = event.target.value"  id="search_users" class="block pt-[3px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="search_users" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search</label>
        </div>
        </h1>
        
      </div>
      
    </div>
    
   <div class="max-w-screen-xl md:mx-auto  mt-[2rem] md:px-0 px-4">
      <div :class="[breadCrumUrl[1]==='users'?'border-b-[1px] border-[#d1d5db] my-[2rem]':'hidden']" >
                      <!-- Modal toggle -->
            <a data-modal-target="crud-modal" data-modal-toggle="crud-modal" :class="[users=='admin'?'block w-max text-blue-700 hover:text-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800':'hidden']" type="button">
              <FontAwesomeIcon :icon="delete" class="mb-0"/>
              <span class="tooltiptextCreate">Create new User </span>
            </a>
            <!-- Main modal -->
            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-[57rem] max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow-sm ">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <div class="leading-[0px] text-left">
                              <h3 class="text-lg font-semibold text-[#18489b] ">
                              Create new User
                            </h3>
                              <span class="text-[12px] text-red-500">Fields marked with * cannot be empty.</span>
                            </div> 
                            <button type="button" class="text-red-500  bg-transparent hover:bg-red-500 hover:text-white rounded-full  border-red-500 border-[1px] text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <form class="md:p-4 p-5 text-left">
                          <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="email" name="floating_email" id="floating_email"  v-model="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address <sup>*</sup></label>
                                <div class="w-full">
                                  <span :class="[MessageEmail===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field Email is empty  
                                    </span>
                                  </div>
                              </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_username" id="floating_email"  v-model="floating_username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                                <div class="w-full">
                                  <span :class="[MessageUserName===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field Username is empty  
                                    </span>
                                  </div>
                              </div>
                          </div>
                          <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="password" name="floating_password" 
                                id="floating_password" v-model="floating_password"  
                                @keyup="MessageBoxPassword(repeat_password,floating_password)"
                                :class="[MessageString===true ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer':'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none   focus:ring-0 focus:border-red-500 peer']"
                                placeholder=" " minlength="8" maxlength="12" required />
                                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                <div class="w-full">
                                  <span :class="[MessagePassword===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field Password is empty  
                                  </span>
                                </div>
                              </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="password" name="repeat_password" 
                                @keyup="MessageBoxPassword(repeat_password,floating_password)" 
                                id="floating_repeat_password" v-model="repeat_password" 
                                :class="[MessageString===true ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer':'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none   focus:ring-0 focus:border-red-500 peer']"
                                placeholder=" " minlength="8" maxlength="12" required />
                                <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                                <div class="w-full">
                                  <span :class="[MessageRepeatPassword===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                      The field Password is empty  
                                  </span>
                                </div>
                              </div>
                          </div>
                          <div class="w-full">
                            <span :class="[number===true ? 'text-[12px] text-green-500 flex gap-2 items-center':'text-[12px] text-red-500 flex gap-2 items-center']">
                              <FontAwesomeIcon :icon="number===true ? faCircleCheck:faCircleXmark " class="mb-0"/>
                                It has a Number 
                          </span>
                          <span :class="[uppercase===true ? 'text-[12px] text-green-500 flex gap-2 items-center':'text-[12px] text-red-500 flex gap-2 items-center']">
                            <FontAwesomeIcon :icon="uppercase===true ? faCircleCheck:faCircleXmark" class="mb-0"/>
                            Word in uppercase
                          </span>
                          <span :class="[signos===true ? 'text-[12px] text-green-500 flex gap-2 items-center':'text-[12px] text-red-500 flex gap-2 items-center']">
                            <FontAwesomeIcon :icon="signos===true ? faCircleCheck:faCircleXmark" class="mb-0"/>
                            It has a @,$,#,%,^,&,*,! 
                          </span>
                        </div>
                          <div class="grid md:grid-cols-2 md:gap-6 mt-[1rem]">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" v-model="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                <div class="w-full">
                                  <span :class="[MessageFirstName===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field FirstName is empty  {{ MessageFirstName }}
                                    </span>
                                  </div>
                              </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_last_name" id="floating_last_name" v-model="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                <div class="w-full">
                                  <span :class="[MessageLastName===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field LastName is empty  
                                    </span>
                                  </div>
                              </div>
                          </div>
                          <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="floating_phone" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                                <div class="w-full">
                                  <span v-if="floating_phone===undefined" :class="[MessagePhone===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                      The field Phone is empty  
                                  </span>
                                  <span v-else :class="[MessageValitePhone===false ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    Invalid Format of the phone {{ MessageValitePhone }}
                                  </span>
                                </div>
                              </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_company" id="floating_company" v-model="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                                <div class="w-full">
                                  <span :class="[MessageCompany===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field Company is empty  
                                    </span>
                                  </div>
                              </div>
                          </div>
                          <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <select  v-model="floating_role" name="floating_role" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required >
                                <option value="" selected >Selection the type user</option>
                                <option value="admin"  >Admin</option>
                                <option value="user"  >user</option>
                                <option value="Modaretor"  >Modaretor</option>
                                </select>
                                <label for="floating_role" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Role</label>
                                <div class="w-full">
                                  <span :class="[MessageRole===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                      The field role is empty  
                                  </span>
                                 
                                </div>
                              </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_title" id="floating_title" v-model="floating_title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#18489b] peer-focus:font-bold peer-focus:dark:text-[#18489b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Title</label>
                                <div class="w-full">
                                  <span :class="[Messagetitle===true ? 'block text-[12px] text-red-500 flex gap-2 items-center': 'hidden']">
                                    <FontAwesomeIcon :icon="faCircleXmark" class="mb-0"/>
                                    The field title is empty  
                                    </span>
                                  </div>
                              </div>
                          </div>
                          <div id="alert-border-2" :class="[parent===''?'hidden': 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800']" role="alert">
                            <FontAwesomeIcon :icon="faCircleInfo" class="mb-0"/>
                            <div class="ms-3 text-sm font-medium" id="alert">
                            </div>
                            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-2" aria-label="Close">
                              <span class="sr-only">Dismiss</span>
                              <FontAwesomeIcon :icon="faClose" class="mb-0"/>
                            </button>
                          </div>
                          <div class="flex gap-2 items-center">
                            <button type="button" @click="addUser(floating_email,floating_password,repeat_password,floating_first_name,floating_last_name,floating_phone,floating_company,floating_username,floating_role,floating_title)" class="text-white border-[1px] bg-[#18489b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-white hover:text-[#18489b] hover:border-[#18489b] hover:border-[1px]">Add</button>
                            <Button type="reset" class="text-[#bece1d] border-[1px] border-[#bece1d] bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#bece1d] hover:text-white hover:border-[#bece1d] hover:border-[1px]">Clear</Button>
                          </div>
                     
                        </form>
                    </div>
                </div>
            </div> 
      </div>
      <div class="text-xs text-[#646161] md:flex  block md:gap-4 items-center bg-[#0798ca30] p-4 w-full text-left">
        <div class="flex gap-2 items-center ">
          <label class="text-[14px] font-bold w-auto ">Order by:</label>
            <select name="" id="" v-model="selected" @change="SelectFilter(selected)" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 ">
              <option value="" selected disabled >Order by</option>
              <option value="asc" >A-z</option>
              <option value="desc" >Z-a</option>
            </select>
        </div>   
        <div class="flex gap-2 items-center">
          <label class="text-[14px] font-bold w-auto ">filter category:</label>
          <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" :class="[breadCrumUrl[1]!=='' ? 'inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 ':'hidden']" type="button">
                <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
              Position
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">
                <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 overflow-auto h-[12rem]" aria-labelledby="dropdownRadioButton">
                    <li v-for="item in categoryTitle">
                        <div class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-1" type="radio"  @click="searchcategoryTitle(item)" name="filter-radio" class="w-4 h-4 text-[#18489b] bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="filter-radio-example-1" class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300">{{item}}</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input  id="filter-radio-example-2" type="radio" value="desc" @click="endPoint('desc')" name="filter-radio" class="w-4 h-4 text-[#18489b] bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="filter-radio-example" class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300">Z-a</label>
                        </div>
                    </li>
                </ul>
        </div> 
       
            </div>
          </div>
      <div class="overflow-x-auto relative ">
        <table class="text-sm md:w-full w-[67rem] border-x-[#d8ecf5] border-[2px] border-b-[#d8ecf5] text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <Thead class="text-xs text-[#646161] uppercase bg-[#0798ca30] w-full ">
            
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Name 
                </th>
                <th scope="col" class="px-6 py-3">
                    Position
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Action
                </th>
            </tr>
          </Thead>
          <tbody>
            <todo-item 
              v-for="(todo,index) in visibleTodos"
              v-bind:visibleTodos="visibleTodos"
              v-bind:currentPage="currentPage"
              v-bind:todo="todo"
              v-on:todo:remove="removeTodo"
              :key="todo.id" >
            </todo-item>
          </tbody>
        </table>

      </div>
      <div v-if="breadCrumUrl[1]=='users'">
        <pagination 
          v-bind:todos="todos"
          v-on:page:update="updatePage"
          v-bind:currentPage="currentPage"
          v-bind:pageSize="pageSize">
        </pagination>
      </div>
      <div v-else class="p-5">
        <router-link to="/users" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Ver más
        </router-link>
        
      </div>
    </div>
    <div class="max-w-screen-xl md:mx-auto md:px-0 px-4"> 
      <hr class="my-[2rem] "/>
      <h1 class="text-left text-[2rem] text-[#18489b] font-[emoji]">Users graph </h1>
      <div style="width:100%;" class="py-[4rem]">
        <canvas id="acquisitions" class="bg-[#f8f8ff] p-[3rem] rounded-lg !w-full !h-full" aria-label="Hello ARIA World" role="img">
        </canvas>
      </div>
    </div>
    <!--<div class="max-w-screen-xl md:mx-auto md:px-0 px-4"> 
      <h1 class="text-left text-[3rem] text-[#18489b] font-[emoji] capitalize birthday"  >Happy birthDay  </h1>
      <span class="text-left text-[1rem] text-[#18489b] font-[emoji] block  ">{{month}} {{  year}} </span>
      <hr class="mb-[2rem] mt-[0.4rem]"/>
      <ol class=" border-s border-gray-200 dark:border-gray-700">                  
            <li class="mb-10 ms-6" v-for="todo in orderTodos.filter(item=>item.date===month)"> 
                <div  class="flex items-center md:gap-[1rem]">
                  <span class="relative  flex items-center justify-center w-[3.5rem] h-[3.5rem] bg-blue-100 rounded-full start-[-2.75rem] md:start-[-3.2rem] ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <img class="rounded-full shadow-lg" :src="todo.image" alt="Bonnie image"/>
                  </span>
                  <div class="items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex dark:bg-gray-700 dark:border-gray-600">
                      <time class="mb-1 text-xs text-gray-400 font-bold text-right sm:order-last w-full sm:mb-0">{{todo.date}} {{year}}</time>
                      <div class="text-[1.2rem] w-full text-gray-500 dark:text-gray-300 w-full font-bold flex items-center gap-4">{{todo.name}}<span class="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">{{todo.cargo}}</span><span class="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">{{todo.departamento}}</span></div>
                </div>
              </div>         
            </li>
        </ol>
    </div>-->
   
</template>
<script src="./paginateAbout.js"></script>
<style>
a.block.text-blue-700.focus\:ring-4.focus\:outline-none.focus\:ring-blue-300.font-medium.rounded-lg.text-sm.px-5.py-2\.5.text-center:hover .tooltiptextCreate {
    visibility: visible;
}
.tooltiptextCreate {
  visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    margin-left: -4.2rem;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    margin-top: -2rem;
}
.tooltiptextCreate::after {
  content: " ";
  position: absolute;
  top: 100%; /* At The bottom of The tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.birthday{
font-size: 3rem;
    font-weight: bold;
    color: transparent;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCk4TJ-tY5URT1BaSeUlGyYgX0c1KNwy6Yg&s'); 
    background-size: 200%; /* Enlarged for smooth animation */
    background-position: 0 50%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate-background 5s infinite alternate linear;
}

@keyframes animate-background {
    0% {
        background-position: 0 50%;
    }
    100% {
        background-position: 100% 70%;
    }
}
input:-internal-autofill-selected {
    background-color:transparent!important;
    
}
input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: light-dark(rgb(232, 240, 254)) !important;
    color: fieldtext !important;
}
</style>