export interface User {
  id?: string;
  role?: any;
}
// export interface UserLogin {
//   username?: string;
//   password?: string;
//   rememberMe?: boolean;
// }

const updateCurrentUserAction = (user: User) => {
  return {
    type: 'updateCurrentUser',
    user: user,
  };
};
// export const userLoginCredentialsAction = (user: UserLogin) => {
//   return {
//     type: "setUserLogin",
//     user: user,
//   };
// };

export default updateCurrentUserAction;
