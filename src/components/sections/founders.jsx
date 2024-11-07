import React from 'react';

const Founders = ({ foundersData }) => {
  const { title, founders } = foundersData;

  return (
    <section className="py-10 mb-10 font-ibm  mx-auto text-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-10">{title}</h2>
      
      <div className="flex flex-wrap justify-center gap-40">
        {founders.map((founder, index) => (
          <div key={index} className="text-center">
            <img
              src={founder.image}
              alt={`${founder.name}'s photo`}
              className="w-32 h-32 md:w-48 md:h-48 rounded-lg mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{founder.name}</h3>
            <p className="text-md font-medium text-gray-600">{founder.position.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Founders;
