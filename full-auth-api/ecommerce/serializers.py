# ecommerce/serializers.py

from rest_framework import serializers
from .models import Product, Cart, Category, ProductImage
    
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
        fields = ['id', 'product', 'quantity']
