# ecommerce/views.py
from django.db.models import Count, Case, When, IntegerField
from rest_framework import generics, permissions, serializers
from rest_framework.generics import ListAPIView
from .models import Product, Favorite, Cart, Review, Checkout
from .serializers import ProductSerializer, ProductSerializer, ReviewSerializer, CartSerializer, CheckoutSerializer
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
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
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
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        book_id = self.kwargs['book_id']
        current_book = get_object_or_404(Product, id=book_id)
        categories = current_book.categories.values_list('name', flat=True)

        related_books = Product.objects.filter(categories__name__in=categories).exclude(id=book_id).distinct()[:3]
        return related_books

# ReviewCreateView
class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        product_id = serializer.validated_data['product']

        if Review.objects.filter(user=user, product=product_id).exists():
            raise serializers.ValidationError({'error': 'You have already reviewed this product.'})
        
        serializer.save(user=user)

# ProductReviewListView
class ProductReviewListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)

# CartListView
class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user).select_related('product')

    def get_serializer_context(self):
        # Include product fields in the serialization
        return {'include_product_fields': True}

class ProductSearchView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        search_term = self.request.query_params.get('search', None)
        if search_term:
            return Product.objects.filter(title__icontains=search_term)
        return Product.objects.none()
    
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

# update_cart_item
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)
    quantity = request.data.get('quantity', 1)

    cart_item = get_object_or_404(Cart, user=user, product=product)
    cart_item.quantity = quantity
    cart_item.save()

    return Response({'status': 'quantity updated'}, status=status.HTTP_200_OK)

# remove_from_cart
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
    favorites = Favorite.objects.filter(user=request.user).prefetch_related('product').values_list('product', flat=True)
    products = Product.objects.filter(id__in=favorites)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# add_to_favorites
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
    
# remove_from_favorites
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_favorites(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)
    Favorite.objects.filter(user=user, product=product).delete()
    return Response({'status': 'removed'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    user = request.user
    try:
        cart_items = Cart.objects.filter(user=user).select_related('product')

        total_amount = 0
        line_items = []
        for cart_item in cart_items:
            # Calculate the price per unit (either discounted price or original price)
            item_price = cart_item.product.discount if cart_item.product.discount else cart_item.product.price
            item_price_cents = int(item_price * 100)  # Convert to cents for Stripe

            # Calculate the shipping cost per unit (0 if free shipping)
            shipping_cost_cents = 0 if cart_item.product.free_shipping else int(cart_item.product.shipping_price * 100)

            # Calculate total cost per unit including shipping
            total_cost_per_unit_cents = item_price_cents + shipping_cost_cents
            total_amount += total_cost_per_unit_cents * cart_item.quantity

            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': cart_item.product.title,
                    },
                    'unit_amount': total_cost_per_unit_cents,  # Price per unit including shipping
                },
                'quantity': cart_item.quantity,
            })

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=request.build_absolute_uri('http://localhost:3000/success'),
            cancel_url=request.build_absolute_uri('http://localhost:3000/cancel'),
        )

        checkout = Checkout.objects.create(
            user=user,
            total_amount=Decimal(total_amount / 100),  # Total amount including product prices and shipping costs
            total_discount=Decimal(sum(cart_item.product.discount for cart_item in cart_items if cart_item.product.discount))
        )

        return Response({
            'id': checkout_session.id,
            'date': datetime.fromtimestamp(checkout_session.created).strftime("%b %d, %Y, %I:%M:%S %p"),
            'payment_method': 'card',
            'reference_number': checkout_session.id,
            'checkout_id': checkout.id
        })
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_checkout_data(request):
    user = request.user
    try:
        # Fetch the latest checkout data for the user
        checkout_data = Checkout.objects.filter(user=user).last()
        if checkout_data:
            # Serialize checkout_data if necessary, or directly return the data
            return Response({
                'total_amount': checkout_data.total_amount,
                'total_discount': checkout_data.total_discount,
                'created_at': checkout_data.created_at
            })
        else:
            return Response({'error': 'No checkout data found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)