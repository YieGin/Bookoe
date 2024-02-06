# ecommerce/serializers.py
from django.conf import settings
from rest_framework import serializers
from .models import Product, Cart, Category, ProductImage, Review, Checkout
    
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):
    additional_images = ProductImageSerializer(many=True, read_only=True)
    categories = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Category.objects.all()
    )

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'price', 'reviews', 'like', 'image', 'discount_percentage', 'additional_images', 'discount', 
            'categories', 'stars', 'author', 'isbn', 'published_year', 
            'publisher', 'in_stock', 'free_shipping', 'shipping_price', 
            'book_format', 'language', 'tags', 'description', 'topic', 
            'sales_count', 'is_best_seller', 'is_special'
        ]

    def get_discount_percentage(self, obj):
        return obj.discount_percentage()

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

    def to_representation(self, instance):
        # Check if the context variable 'include_product_fields' is True
        include_product_fields = self.context.get('include_product_fields', False)
        data = super().to_representation(instance)
        if include_product_fields:
            # Serialize the associated product's fields and merge them into the cart item data
            product_fields = ProductSerializer(instance.product).data
            data.update(product_fields)
        return data
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['first_name', 'last_name', 'email']      

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'comment', 'rating', 'created_at', 'user_name']
        read_only_fields = ['user', 'created_at']

    def get_user_name(self, obj):
        """
        This method returns the full name of the user who wrote the review.
        """
        return f"{obj.user.first_name} {obj.user.last_name}"
