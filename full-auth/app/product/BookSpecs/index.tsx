import React, { useEffect, useState } from 'react';
import { Product, fetchRecommendedProducts, fetchRelatedBooks } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LiaStarSolid } from 'react-icons/lia';
import { IoCartOutline } from 'react-icons/io5';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import WriteReviews from './WriteReviews';
import { addToCart } from '@/redux/features/cartSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';

interface ProductBooksSpecs {
  product: Product;
}

const BookSpecsItem: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className='border-b-[1px] px-5 flex gap-x-20 py-4 items-center'>
    <p className='text-[#11142D] font-bold text-[17px] font-sans w-[300px]'>{title}</p>
    {content}
  </div>
);

const BookSpecs: React.FC<ProductBooksSpecs> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const relatedBooks = useAppSelector((state) => state.products.relatedBooks);
  const [isOpen, setIsOpen] = useState(true)
  const productId = pathname.split('/').pop() || searchParams.get('id');
  const initialQuantity = Number(sessionStorage.getItem(`product_${productId}_quantity`)) || 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (product && product.id) {
      dispatch(fetchRelatedBooks(product.id));
    }
  }, [dispatch, product]);

  const handleAddToCart = (productId: number) => {
    dispatch(addToCart({ productId, quantity }))
      .then(() => dispatch(fetchCartCount()));
  };

  const navigateToProductPage = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleOnClickCustomer = () => {
    setIsOpen(false)
  }
  const handleOnClickDetails = () => {
    setIsOpen(true)
  }

  const specItems = [
    { title: 'Book Title', content: product.title },
    { title: 'Author', content: product.author },
    { title: 'ISBN', content: product.isbn },
    { title: 'Edition Language', content: product.language },
    { title: 'Book Format', content: product.book_format },
    { title: 'Date Published', content: product.published_year.toString() },
    {
      title: 'Tags',
      content: product.categories.map((category, index) => (
        <p key={index} className='dark:text-[#6C5DD3] text-[#6C5DD3] text-[17px] font-sans bg-[#F0EEFF] p-2 px-4 rounded-lg'>
          {typeof category === 'string' ? category : category.name}
        </p>
      ))
    },
  ];

  return (
    <div className='mt-20 font-Cairo flex gap-x-10'>
      <div className='w-[80%]'>
        <div className='flex gap-x-32 mb-10'>
          <h1 onClick={handleOnClickDetails} className={`text-[30px] cursor-pointer font-bold ${isOpen ? 'text-[#11142D]' : 'text-[#AAAAAA]'}`}>Details Product</h1>
          <h1 onClick={handleOnClickCustomer} className={`text-[30px] cursor-pointer font-bold ${isOpen ? 'text-[#AAAAAA]' : 'text-[#11142D]'}`}>Write Reviews</h1>
        </div>
        {isOpen ? (
        <div className='border-[1px] border-[#F0EEFF] rounded-lg w-full flex flex-col'>
          {specItems.map((item, index) => (
            <BookSpecsItem key={index} title={item.title} content={item.content} />
          ))}
        </div>
         ) : <WriteReviews />}
      </div>
      <div className='flex flex-col gap-y-5'>
        <h1 className='text-[#11142D] text-[30px] font-bold mb-10'>Related Books</h1>
        {relatedBooks.map((item) => (
          <div key={item.id} className='flex gap-x-5'>
            <img onClick={() => navigateToProductPage(item.id)} className='w-[140px] cursor-pointer h-[190px] rounded-[14px] object-cover' src={item.image} alt={item.title} />
            <div>
              <h1 className='text-[#11142D] text-[18px] font-bold line-clamp-1'>{item.title}</h1>
              <div className='flex gap-x-2'>
                {product.categories.map((category, index) => (
                  <p key={index} className='text-[#6C5DD3] dark:text-[#8a7bf0] text-[14px] font-sans line-clamp-1'>
                    {typeof category === 'string' ? category : category.name}
                  </p>
                ))}
              </div>
              <div className='flex gap-x-3 items-center my-3'>
                <LiaStarSolid className='text-[#FF754C] text-[20px]' />
                <h3 className='text-[#FF754C] text-[18px] font-bold'>{item.stars}</h3>
                <h3 className='text-[#AAAAAA] text-[14px] font-semibold line-clamp-1'>{item.reviews} reviews</h3>
              </div>
              <div className='flex gap-x-3 items-center mb-3'>
                <p className='text-[#11142D] text-[18px] font-bold'>${item.discount}</p>
                <p className='text-[#AAAAAA] text-[16px] font-semibold'>${item.price}</p>
              </div>
              <div onClick={() => handleAddToCart(item.id)} className='flex gap-x-3 items-center cursor-pointer'>
                <IoCartOutline className='text-[#6C5DD3] text-[20px]' />
                <p className='text-[#6C5DD3] text-[18px] font-bold'>Add to cart</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSpecs;
