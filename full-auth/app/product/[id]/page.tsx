'use client';
import { useEffect } from 'react';
import { RootState } from '@/redux/store';
import { usePathname, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/common';
import { fetchAllProducts } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productId = pathname.split('/').pop() || searchParams.get('id');

  const products = useAppSelector((state: RootState) => state.products.allOfProducts);
  const product = products.find((product: any) => product.id.toString() === productId);

  useEffect(() => {
    if (!product && productId && products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [productId, product, products, dispatch]);


  if (!productId || !product) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      {/* Render other product details */}
    </div>
  );
}