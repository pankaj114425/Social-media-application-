import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";


const INITIAL_STATE={
    // user:  {
    //     "_id": 
    //        "64f2fef95c9dc6e71ac2faea",
        
    //     "username": "ram",
    //     "email": "rk@gmail.com",
    //     "password": "$2b$10$/RSltdGVs/ftrLrjGvqxQu26wKYP.co9Gcz69YsJtoKHScD1Bsz9O",
    //     "profilePicture": "person/1.jpeg",
    //     "coverPicture": "",
    //     "followers": [
    //       "64f2fee95c9dc6e71ac2fae8"
    //     ],
    //     "followings": [],
    //     "isAdmin": false,
    //     "__v": 0,
    //     "desc": "hey friends!",
    //     "city": "ayodhya",
    //     "from": "uttar Pradesh"
    //   },
    user:null,
    isFetching:false,
    error:false
}
export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider =({children})=>{          //create a provider 
         const [state,dispatch] =useReducer(AuthReducer,INITIAL_STATE);
         return(
            <AuthContext.Provider value ={{user:state.user,
                 isFetching:state.isFetching,
                 error:state.error,
                 dispatch
                 }}>
                    {children}
                     </AuthContext.Provider>
         )
}

// import { createContext, useEffect, useReducer } from "react";
// import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//   user:JSON.parse(localStorage.getItem("user")) || null,
//   isFetching: false,
//   error: false,
// };


// export const AuthContext = createContext(INITIAL_STATE);

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
//   useEffect(()=>{
//     localStorage.setItem("user", JSON.stringify(state.user))
//   },[state.user])
  
//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         isFetching: state.isFetching,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };