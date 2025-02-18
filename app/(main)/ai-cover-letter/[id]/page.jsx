import React from 'react'

async function CoverLetter({params}) {
    const id = await params.id;
    console.log(id);
    
  return (
    <div>
      cover letter : {id}
    </div>
  )
}

export default CoverLetter
