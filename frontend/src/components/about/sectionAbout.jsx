import React from 'react'

const SectionAbout = () => {
  return (
    <section
    className="bg-cover bg-center bg-no-repeat   "
  style={{
    backgroundImage: 'url("grass.jpg")',
    minHeight:  'calc(100vh - 42px) '
  }}
>  <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <div className="max-w-lg">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          About Us
        </h2>
        <p className="mt-4 text-white text-lg">
        We are a team of sports enthusiasts who firmly believe in the power of movement and the
        importance of community. After noticing that many people want to engage in sports 
        activities but struggle to find partners, we decided to create an app that facilitates
        this connection.
        </p>
     
      </div>
      <div className="mt-12 md:mt-0">
        <img
          src="balls.png"
          alt="About Us Image"
          className="object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</section>

  )
}

export default SectionAbout;