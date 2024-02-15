'use client'
import React, { useEffect } from 'react';
import { decrementQuantity, fetchCartItems, incrementQuantity, initiateCheckout, removeFromCart, updateCartItemQuantity } from '@/redux/features/cartSlice';
import { Product, fetchProductById } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FaAmazonPay, FaCcAmazonPay, FaMinus, FaOpencart, FaPlus } from 'react-icons/fa';
import { MdOutlineClose, MdOutlinePayments, MdPayment, MdPayments } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { fetchCartCount } from '@/redux/features/cartCountSlice';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { LiaCcAmazonPay } from 'react-icons/lia';

const Cart = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { cartItems } = useAppSelector((state: any) => state.cart);
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

    const handleCheckout = async () => {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Stripe has not been initialized');
        return;
      }
      dispatch(initiateCheckout())
      .unwrap()
      .then(checkoutSession => {
        return stripe.redirectToCheckout({ sessionId: checkoutSession.id });
      })
      .catch(error => console.error('Checkout error:', error));
    };

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleIncrement = (id: number) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id: number) => {
      dispatch(decrementQuantity(id));
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id))
            .then(() => {
                dispatch(fetchCartCount());
            });
    };
    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateCartItemQuantity({ id, quantity }));
    };

    const navigateToProductPage = async (productId: number) => {
        try {
            await dispatch(fetchProductById(productId)).unwrap();
            router.push(`/product/${productId}`);
        } catch (error) {
            console.error('Error fetching product by ID:', error);
        }
    };

    // Calculate Subtotal
    const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.discount * item.quantity, 0);

    // Calculate Shipping Price
    const shippingPrice = cartItems.reduce((acc: number, item: any) => {
        const shippingCostPerItem = item.free_shipping ? 0 : Number(item.shipping_price) || 0;
        return acc + (shippingCostPerItem * item.quantity);
    }, 0);

    // Calculate Total
    const total = subtotal + shippingPrice;

    const containerHeight = cartItems.length <= 3 ? 'h-screen' : 'h-full';

    if (cartItems.length === 0) {
      return (
        <div className='h-screen flex flex-col items-center justify-center xs:px-5 dark:bg-[#11161b]'>
          <FaOpencart className='text-[#ABABAB] text-[40px] mb-5' /> 
          <h1 className='text-[30px] font-bold font-Rubik text-[#11142D] dark:text-[#FFF]'>Your Cart is Empty</h1>
          <p 
            className='md:text-[20px] xs:text-[15px] font-sans dark:text-[#ABABAB] text-[#ABABAB] text-center'>
            You don’t have any products in your cart yet. Discover great books and deals in our 
            <Link className='text-[#6C5DD3] ml-1 dark:text-[#7381fc] underline-offset-1 underline' href={'/books-list'}>books-list</Link>.
          </p>
        </div>
      );
    }

    return (
      <div className={`py-10 font-Cairo text-[#11142D] dark:text-[#FFF] dark:bg-[#11161b] ${containerHeight}`}>
        <h1 className='font-bold text-[40px] font-Rubik pl-10'>Shopping Cart</h1>
        <hr className="border-0 h-0 bg-transparent md:my-10 xs:my-5" style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#ABABAB', borderSpacing: '44px' }} />
        <div className='flex md:justify-center gap-x-10 xs:flex-wrap md:px-20 lg:px-0'>
          <div className='flex flex-col xs:px-2 md:px-10 gap-y-5'>
            {cartItems.map((item: Product) => (
              <div className='border-b-[1px] dark:border-[#5a5a5a] pb-10 flex xs:w-full sm:w-[100%] md:w-[700px] lg-md:w-[800px]' key={item.id}>
                <img onClick={() => navigateToProductPage(item.id)} className='border-2 p-1 dark:border-[#5a5a5a] dark:border-[1px] md:w-40 md:h-52 xs:w-28 xs:h-36 rounded-[14px] object-cover md:mr-3 xs:mr-2 cursor-pointer' src={`https://bookoegin-d820f894692b.herokuapp.com/${item.image}`} alt={item.title} />
                <div className='w-full'>
                  <div className='flex justify-between w-full h-max items-center md:mb-5 xs:mb-2'>
                    <p className='font-bold md:text-[20px] text-[#11142D] dark:text-[#FFF]'>{item.title}</p>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      <MdOutlineClose className='text-[20px] text-[#11142D] dark:text-[#FFF]' />
                    </button>
                  </div>
                  <div className='flex'>
                    <div className='flex flex-col gap-y-1'>
                      <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[11px]'>auth: <span>{item.author}</span></p>
                      <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[11px]'>Year: <span>{item.published_year}</span></p>
                      <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[11px]'>Quantity: <span>{item.quantity}</span></p>
                      {item.free_shipping ? (
                          <p className='text-green-500 font-Roboto md:text-[16px] xs:text-[11px]'>Free Shipping</p>
                      ) : (
                          <p className='text-[#ABABAB] font-Roboto md:text-[16px] xs:text-[11px]'>
                              Shipping price: <span>{item.shipping_price}$</span>
                          </p>
                      )}
                    </div>
                    <div className='ml-auto'>
                      <div className='flex gap-x-2 items-center'>
                          <p className='font-bold xs:text-[12px] md:text-[22px] text-[#11142D] dark:text-[#FFF] ml-auto'>{item.discount}$</p>
                          <p className='font-bold font-sans xs:text-[12px] md:text-[1-px] text-[#ABABAB] line-through '>{item.price}$</p>
                      </div>
                      <div className='rounded-[14px] md:px-5 xs:px-1 w-max flex border-[1px] dark:border-[#5a5a5a] ml-auto items-center md:gap-x-5 xs:gap-x-4 md:py-2 xs:py-1 my-5'>
                          <button onClick={() => handleDecrement(item.id)}>
                              <FaMinus className="md:text-[17px] xs:text-[14px] text-[#6C5DD3]" />
                          </button>
                          <p className='dark:text-[#fff]'>{item.quantity}</p>
                          <button onClick={() => handleIncrement(item.id)}>
                              <FaPlus className="md:text-[12px] xs:text-[10px] text-[#6C5DD3]" />
                          </button>
                      </div>
                      <button className='button xs:px-1 md:px-3 py-1' onClick={() => handleUpdateQuantity(item.id, item.quantity)}><p className='xs:text-[8px] text-white font-bold sm:text-[14px] lg-md:text-[14px] '>Update quantity</p></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='border-[1px] dark:border-[#5a5a5a] lg:w-[400px] xs:w-full h-max p-5 sticky top-10 right-0 space-y-3'>
            <h1 className='text-[#11142D] dark:text-[#FFF] font-bold text-[25px] mb-5'>Order Summary</h1>
            <div className='flex justify-between'>
                <p className='text-[#ABABAB] font-bold text-[18px] uppercase'>Subtotal</p>
                <p className='text-[#11142D] dark:text-[#FFF] font-bold'>{subtotal.toFixed(2)} $</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-[#ABABAB] font-bold text-[18px] uppercase'>Shipping price</p>
                <p className='text-[#11142D] dark:text-[#FFF] font-bold'>{shippingPrice.toFixed(2)} $</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-[#ABABAB] font-bold text-[18px] uppercase'>Total</p>
                <p className='text-[#11142D] dark:text-[#FFF] font-bold'>{total.toFixed(2)} $</p>
            </div>
            <button onClick={handleCheckout}  className="Btn w-full h-[40px] font-Roboto">
              <p>PLACE ORDER</p>
              <MdOutlinePayments className='svgIcon text-[25px]' /> 
            </button>
          </div>
        </div>
      </div>
    );
}

export default Cart;
