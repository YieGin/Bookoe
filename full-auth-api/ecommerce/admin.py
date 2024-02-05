from django.contrib import admin
from .models import Product, Favorite, Cart, Category, ProductImage, Review

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_best_seller', 'sales_count', 'is_special', 'id')
    inlines = [ProductImageInline]
    list_editable = ('is_best_seller', 'is_special')
    filter_horizontal = ('categories',)
    
    
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
admin.site.register(Favorite)
admin.site.register(Cart)
admin.site.register(Category)
admin.site.register(Review)