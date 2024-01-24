# ecommerce/views.py
from django.db.models import Count, Case, When, IntegerField
from rest_framework import generics, permissions
from rest_framework.generics import ListAPIView
from .models import Product, Favorite, Cart
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.views import APIView
from django.db.models.functions import Substr
from decimal import Decimal, InvalidOperation
from rest_framework.pagination import PageNumberPagination
from datetime import datetime

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Product.objects.all().order_by('id')
        user = self.request.user
        category = self.request.query_params.get('category', None)
        stars = self.request.query_params.get('stars', None)
        is_best_seller = self.request.query_params.get('is_best_seller', None)
        is_special = self.request.query_params.get('is_special', None)
        published_year = self.request.query_params.get('published_year', None)

        if category:
            for cat in category.split(','):
                queryset = queryset.filter(categories__name=cat)
        if stars:
            try:
                stars_value = Decimal(stars)
                queryset = queryset.filter(stars=stars_value)
            except InvalidOperation:
                pass
        if is_best_seller:
            queryset = queryset.filter(is_best_seller=True)
        if is_special:
            queryset = queryset.filter(is_special=is_special.lower() == 'true')
        if published_year:
            queryset = queryset.filter(published_year__year=published_year)

        # If the user is authenticated and has preferences
        if user.is_authenticated and hasattr(user, 'has_preferences') and user.has_preferences():
            preferred_categories = (
                Favorite.objects.filter(user=user)
                .values('product__category')
                .annotate(total=Count('product__category'))
                .order_by('-total')
                .values_list('product__category', flat=True)
            )

            if preferred_categories:
                queryset = queryset.annotate(
                    preference_order=Case(
                        *[When(category=cat, then=pos) for pos, cat in enumerate(preferred_categories)],
                        default=len(preferred_categories),
                        output_field=IntegerField()
                    )
                ).order_by('preference_order', '-sales_count')
            else:
                # If no specific preferences, show best sellers or another metric
                queryset = queryset.order_by('-sales_count')
        elif user.is_anonymous or not hasattr(user, 'has_preferences'):
            # For new or anonymous users, show random products
            queryset = queryset.order_by('id')

        return queryset

    def post(self, request, *args, **kwargs):
        self.permission_classes = [permissions.IsAuthenticated]
        return super().post(request, *args, **kwargs)


class AllProductsView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = None  # This disables pagination

# ProductDetailView ID
class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# BestSellerView
class BestSellerView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        best_sellers = Product.objects.filter(is_best_seller=True).order_by('-sales_count')[:4]  # Adjust the limit as needed
        serializer = ProductSerializer(best_sellers, many=True)
        return Response(serializer.data)

# SpecialOffersView
class SpecialOffersView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        special_offers = Product.objects.filter(is_special=True)[:3]  # Adjust the limit as needed
        serializer = ProductSerializer(special_offers, many=True)
        return Response(serializer.data)
    
# RecommendedProductsView
class RecommendedProductsView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        recommended_products = Product.objects.order_by('?')[:4]
        serializer = ProductSerializer(recommended_products, many=True)
        return Response(serializer.data)
    
# NewestBooksView
class NewestBooksView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        current_year = datetime.now().year
        newest_books = Product.objects.filter(published_year__year=current_year).order_by('-published_year')[:100]
        
        serializer = ProductSerializer(newest_books, many=True)
        return Response(serializer.data)
    
# FiveStarProductsView
class FiveStarProductsView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        five_star_products = Product.objects.filter(stars=5.0)[:5]
        serializer = ProductSerializer(five_star_products, many=True)
        return Response(serializer.data)

# RelatedBooksView
class RelatedBooksView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        book_id = self.kwargs['book_id']
        current_book = get_object_or_404(Product, id=book_id)
        categories = current_book.categories.values_list('name', flat=True)

        related_books = Product.objects.filter(categories__name__in=categories).exclude(id=book_id).distinct()[:3]
        return related_books

# add_to_cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)
    quantity = request.data.get('quantity', 1)  # Get quantity from the request

    cart_item, created = Cart.objects.get_or_create(user=user, product=product)

    cart_item.quantity = quantity  # Set quantity as requested
    cart_item.save()

    return Response({'status': 'quantity updated'}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)

    Cart.objects.filter(user=user, product=product).delete()

    return Response({'status': 'removed'}, status=status.HTTP_204_NO_CONTENT)


# cart_count
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_count(request):
    count = Cart.objects.filter(user=request.user).count()
    return Response({'count': count})


# favorite_count
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favorite_count(request):
    count = Favorite.objects.filter(user=request.user).count()
    return Response({'count': count})

# list_favorites
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_favorites(request):
    favorites = Favorite.objects.filter(user=request.user).values_list('product_id', flat=True)
    return Response(favorites)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request, product_id):
    """View to add a product to the user's favorites."""
    user = request.user
    product = get_object_or_404(Product, id=product_id)
    favorite, created = Favorite.objects.get_or_create(user=user, product=product)

    if created:
        return Response({'status': 'added'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'status': 'already in favorites'}, status=status.HTTP_200_OK)