import React,{createContext,useContext,useState} from 'react';
import {read,save,normalizePhone} from '../utils/helpers';
const C=createContext(null);
export const useApp=()=>useContext(C);
export function AppProvider({children}){
 const [users,setUsers]=useState(()=>read('dz_users',[]));
 const [session,setSession]=useState(()=>read('dz_session',null));
 const [appointments,setAppointments]=useState(()=>read('dz_appointments',[]));
 const [reviews,setReviews]=useState(()=>read('dz_reviews',[]));
 const user=users.find(u=>u.id===session)||null;
 const updateUsers=v=>{setUsers(v);save('dz_users',v)};
 const updateAppointments=v=>{setAppointments(v);save('dz_appointments',v)};
 function register({firstName,lastName,phone,password}){const p=normalizePhone(phone);if(!p)return 'شماره موبایل معتبر نیست.';if(users.some(u=>u.phone===p))return 'این شماره قبلاً ثبت شده است.';if(firstName.trim().length<2||lastName.trim().length<2)return 'نام و نام خانوادگی را کامل وارد کنید.';if(password.length<8)return 'رمز عبور باید حداقل ۸ کاراکتر باشد.';const id=crypto.randomUUID();updateUsers([...users,{id,firstName:firstName.trim(),lastName:lastName.trim(),phone:p,password}]);setSession(id);save('dz_session',id);return null}
 function login(phone,password){const p=normalizePhone(phone);const u=users.find(u=>u.phone===p&&u.password===password);if(!u)return 'شماره موبایل یا رمز عبور اشتباه است.';setSession(u.id);save('dz_session',u.id);return null}
 function logout(){setSession(null);localStorage.removeItem('dz_session')}
 function editProfile(data){if(!user)return 'ابتدا وارد شوید.';if(data.password&&data.password.length<8)return 'رمز جدید باید حداقل ۸ کاراکتر باشد.';updateUsers(users.map(u=>u.id===user.id?{...u,firstName:data.firstName.trim(),lastName:data.lastName.trim(),...(data.password?{password:data.password}:{})}:u));return null}
 function book(doctorId,date,time){if(!user)return 'ابتدا وارد شوید.';if(appointments.some(a=>a.doctorId===doctorId&&a.date===date&&a.time===time&&a.status==='active'))return 'این ساعت قبلاً رزرو شده است.';updateAppointments([...appointments,{id:crypto.randomUUID(),userId:user.id,doctorId,date,time,status:'active'}]);return null}
 function cancel(id){updateAppointments(appointments.map(a=>a.id===id&&a.userId===user?.id?{...a,status:'cancelled'}:a))}
 function review(doctorId,stars,comment){if(!user)return 'ابتدا وارد شوید.';if(!comment.trim())return 'متن نظر را وارد کنید.';const next=[...reviews,{id:crypto.randomUUID(),doctorId,userId:user.id,name:user.firstName+' '+user.lastName,stars,comment:comment.trim(),createdAt:new Date().toISOString()}];setReviews(next);save('dz_reviews',next);return null}
 return <C.Provider value={{user,users,appointments,reviews,register,login,logout,editProfile,book,cancel,review}}>{children}</C.Provider>
}
