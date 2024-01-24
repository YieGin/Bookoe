# ecommerce/urls.py
from django.urls import path
from .views import AllProductsView, ProductListCreateView, BestSellerView, ProductDetailView, SpecialOffersView, RecommendedProductsView, RelatedBooksView, NewestBooksView, FiveStarProductsView, add_to_favorites, favorite_count, add_to_cart, cart_count, list_favorites, remove_from_cart

urlpatterns = [
    path('all-products/', AllProductsView.as_view(), name='all-products'),
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('best-sellers/', BestSellerView.as_view(), name='best-sellers'),
    path('special-offers/', SpecialOffersView.as_view(), name='special-offers'),
    path('recommended-products/', RecommendedProductsView.as_view(), name='recommended-products'),
    path('newest-books/', NewestBooksView.as_view(), name='newest-books'),
    path('five-star-products/', FiveStarProductsView.as_view(), name='five-star-products'),
    path('favorites/', list_favorites, name='list-favorites'),
    path('add-to-favorites/<int:product_id>/', add_to_favorites, name='add-to-favorites'),
    path('favorites-count/', favorite_count, name='favorites-count'),
    path('add-to-cart/<int:product_id>/', add_to_cart, name='add-to-cart'),
    path('cart-count/', cart_count, name='cart-count'),
    path('remove-from-cart/<int:product_id>/', remove_from_cart, name='remove-from-cart'),
    path('related-books/<int:book_id>/', RelatedBooksView.as_view(), name='related-books'),
]