import { atomWithStorage } from 'jotai/utils'


const login_Count = atomWithStorage('logcount', 0);
const Access_jwt = atomWithStorage("Accessjwt", {});
const User_info = atomWithStorage("Userinfo", {});

export { login_Count, Access_jwt, User_info }
