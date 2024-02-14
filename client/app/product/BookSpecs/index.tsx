import React, { useEffect, useState } from 'react';
import { Product, fetchRelatedBooks } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import WriteReviews from './WriteReviews';
import { addToCart } from '@/redux/features/cartSlice';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import Reviews from './Reviews';
import RelatedBookItem from './RelatedBookItem';
import Link from 'next/link';

interface ProductBooksSpecs {
  product: Product;
  averageRating: Product | any;
  reviews: Product | any;
  ratingCount: Product | any;
}

const BookSpecsItem: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className='border-b-[1px] dark:border-[#464646] md:px-5 xs:px-2 flex md:gap-x-20 md:py-4 xs:py-2 items-center justify-between'>
    <p className='text-[#11142D] dark:text-[#7381fc] font-bold md:text-[17px] xs:text-[12px] font-sans md:w-[300px]'>{title}</p>
    <div className='dark:text-[#F0F0F0] flex xs:gap-x-2 md:gap-x-20 md:text-[17px] xs:text-[12px]'>{content}</div>
  </div>
);


const BookSpecs: React.FC<ProductBooksSpecs> = ({ product, averageRating, reviews, ratingCount }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const relatedBooks = useAppSelector((state) => state.products.relatedBooks);
  const productIdString = pathname.split('/').pop();
  const productIdFromSearch = searchParams.get('id');
  const productId = productIdString || productIdFromSearch || '0';
  const initialQuantity = Number(sessionStorage.getItem(`product_${productId}_quantity`)) || 1;
  const [quantity] = useState(initialQuantity);
  const [tab, setTab] = useState<'details' | 'writeReview' | 'reviews'>(
    sessionStorage.getItem('currentTab') as 'details' | 'writeReview' | 'reviews' || 'details'
  );

  const updateTab = (newTab: 'details' | 'writeReview' | 'reviews') => {
    setTab(newTab);
    sessionStorage.setItem('currentTab', newTab);
  };

  const handleOnClickDetails = () => updateTab('details');
  const handleOnClickWriteReview = () => updateTab('writeReview');
  const handleOnClickReviews = () => updateTab('reviews');

  useEffect(() => {
    const storedTab = sessionStorage.getItem('currentTab');
    if (storedTab && (storedTab === 'details' || storedTab === 'writeReview' || storedTab === 'reviews')) {
      setTab(storedTab);
    }
  }, []);

  useEffect(() => {
    if (product && product.id) {
      dispatch(fetchRelatedBooks(product.id));
    }
  }, [dispatch, product]);


  const handleAddToCart = (id: number) => {
    dispatch(addToCart({ id, quantity }))
      .then(() => dispatch(fetchCartCount()));
  };

  const navigateToProductPage = (productId: number) => {
    router.push(`/product/${productId}`);
  };


  const specItems = [
    { title: 'Book Title', content: product.title },
    { title: 'Author', content: product.author },
    { title: 'ISBN', content: product.isbn },
    { title: 'Edition Language', content: product.language },
    { title: 'Book Format', content: product.book_format },
    { title: 'Date Published', content: product.published_year.toString() },
    {
      title: 'Tags',
      content: product.categories.map((category, index) => {
        const categoryName = typeof category === 'string' ? category : category.name;
        return (
          <Link
            href={`/books-list?category=${encodeURIComponent(categoryName)}`}
            key={index}
            className='dark:text-[#7381fc] font-medium text-[#6C5DD3] md:text-[17px] xs:text-[12px] font-sans bg-[#F0EEFF] p-2 md:px-4 rounded-lg'
          >
            {categoryName}
          </Link>
        );
      })
    },    
  ];

  return (
    <div className='mt-20 font-Cairo flex gap-x-10 xs:flex-col lg:flex-row'>
      <div className='lg:w-[80%]'>
        <div className='flex md:gap-x-10 xs:gap-x-4 mb-10'>
          <h1 onClick={handleOnClickDetails} className={`md:text-[30px] xs:text-[15px] cursor-pointer font-bold ${tab === 'details' ? 'text-[#11142D] dark:text-[#fff]' : 'text-[#AAAAAA]'}`}>Details Product</h1>
          <h1 onClick={handleOnClickWriteReview} className={`md:text-[30px] xs:text-[15px] cursor-pointer font-bold ${tab === 'writeReview' ? 'text-[#11142D] dark:text-[#fff]' : 'text-[#AAAAAA]'}`}>Write Reviews</h1>
          <h1 onClick={handleOnClickReviews} className={`md:text-[30px] xs:text-[15px] cursor-pointer font-bold ${tab === 'reviews' ? 'text-[#11142D] dark:text-[#fff]' : 'text-[#AAAAAA]'}`}>Reviews</h1>
        </div>
        {tab === 'details' && (
          <div className='border-[1px] border-[#F0EEFF] dark:border-[#464646] rounded-lg w-full flex flex-col'>
            {specItems.map((item, index) => (
              <BookSpecsItem key={index} title={item.title} content={item.content} />
            ))}
          </div>
        )}
        {tab === 'writeReview' && <WriteReviews productId={productId} averageRating={averageRating} reviews={reviews} ratingCount={ratingCount} />}
        {tab === 'reviews' && <Reviews averageRating={averageRating} reviews={reviews} ratingCount={ratingCount} />}
      </div>
      <div className='flex flex-col gap-y-5'>
        <h1 className='text-[#11142D] dark:text-[#fff] text-[30px] font-bold lg:mb-10 xs:mt-5'>Related Books</h1>
        {relatedBooks.map((item) => (
          <RelatedBookItem
            key={item.id}
            item={item}
            onAddToCart={() => handleAddToCart(item.id)}
            onNavigate={() => navigateToProductPage(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSpecs;