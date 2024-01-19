import Testimonial from "./testimonial";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Shopping book in Bookoe is very easy. Quick delivery and fast response. Their services are awesome!",
      name: "Steve Henry",
      role: "Book Lovers",
      stars: 4,
    },
    {
      text: "Bookoe's user-friendly mobile app allows me to carry my entire book collection in my pocket. It's a must-have for anyone who loves to read on the go.",
      name: "Islam Belamri",
      role: "Book Lovers",
      stars: 5,
    },
    {
      text: "As a book club organizer, Bookoe has been a lifesaver. It simplifies book selection, scheduling, and discussion coordination. It's the perfect tool for book clubs of all sizes.",
      name: "Miranda Lee",
      role: "Book Lovers",
      stars: 4,
    },  
  ];

  return (
    <div className='font-Cairo flex md:items-center flex-col md:mt-32 xs:mt-10 md:px-10 xs:px-2'>
      <h1 className='text-black dark:text-[#F0F0F0] font-bold md:text-[50px] xs:text-[30px] md:text-center'>Testimonials</h1>
      <p className='text-[#aaa] md:text-[16px] xs:text-[14px] md:text-center font-sans md:w-[50%] xs:mb-5 md:mb-0'>
        Bookoe has completely transformed my reading experience! The user-friendly
        interface and vast library of books make it my go-to platform for discovering
        new titles. I highly recommend it to fellow book lovers.
      </p>
      <div className='flex gap-5 xs:flex-wrap md:flex-nowrap xs:mt-10'>
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
