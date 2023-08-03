import React from 'react'
import ContentLoader from 'react-content-loader'
const ClinicSearchLoader = () => {
return (

    <ContentLoader 
    speed={2}
    width={1400}
    height={250}
   
    className='p-2 px-4 w-full '
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="9" ry="9" width="113" height="26" /> 
    <rect x="125" y="0" rx="9" ry="9" width="113" height="26" /> 
    <rect x="250" y="0" rx="9" ry="9" width="113" height="26" /> 
    <rect x="375" y="0" rx="9" ry="9" width="113" height="26" /> 
    <rect x="1" y="55" rx="9" ry="9" width="48" height="43" /> 
    <rect x="72" y="56" rx="9" ry="9" width="458" height="17" /> 
    <rect x="72" y="83" rx="7" ry="7" width="203" height="13" /> 
    <rect x="1" y="125" rx="9" ry="9" width="48" height="43" /> 
    <rect x="72" y="125" rx="9" ry="9" width="458" height="17" /> 
    <rect x="72" y="151" rx="7" ry="7" width="203" height="13" /> 
    <rect x="1" y="195" rx="9" ry="9" width="48" height="43" /> 
    <rect x="72" y="199" rx="9" ry="9" width="458" height="17" /> 
    <rect x="72" y="223" rx="7" ry="7" width="203" height="13" />
  </ContentLoader>
)



}

export default ClinicSearchLoader