export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
  register : {
    url : "/api/user/register",
    method : "post"
  },
   login : {
    url : "/api/user/login",
    method : "post"
  },
  userDetails : {
    url : '/api/user/user-details',
    method : "get"
  }, 
  logout : {
    url : "/api/user/logout",
    method : "get"
  },
}


export default SummaryApi