# ecommerce/models.py
from django.db import models
from django.conf import settings
from decimal import Decimal

CATEGORY_CHOICES = [
    ('Action/Fantasy', 'Action/Fantasy'),
    ('Adventure', 'Adventure'),
    ('History', 'History'),
    ('Animation', 'Animation'),
    ('Horror', 'Horror'),
    ('Biography', 'Biography'),
    ('Mystery', 'Mystery'),
    ('Comedy', 'Comedy'),
    ('Romance', 'Romance'),
    ('Crime', 'Crime'),
    ('Sci-fi', 'Sci-fi'),
    ('Documentary', 'Documentary'),
    ('Sport', 'Sport'),
]

class Category(models.Model):
    name = models.CharField(max_length=100, choices=CATEGORY_CHOICES, unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=Decimal('0.99'))
    image = models.ImageField(upload_to='products/')
    discount = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.99'))
    categories = models.ManyToManyField(Category, blank=True)
    stars = models.DecimalField(max_digits=2, decimal_places=1)
    author = models.CharField(max_length=255, blank=True, null=True)
    isbn = models.CharField(max_length=13, blank=True, null=True)
    published_year = models.DateField()
    publisher = models.CharField(max_length=255, blank=True, null=True)
    in_stock = models.BooleanField(default=True)
    free_shipping = models.BooleanField(default=False)
    shipping_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    book_format = models.CharField(max_length=50, blank=True, null=True)
    language = models.CharField(max_length=50, blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    topic = models.TextField(blank=True, null=True)
    sales_count = models.PositiveIntegerField(default=0)
    is_best_seller = models.BooleanField(default=False)
    is_special = models.BooleanField(default=False)
    
    def discount_percentage(self):
        if self.price and self.discount:
            count = (self.discount / self.price) * 100
            total = 100 - count
            return total
        return 0

    def __str__(self):
        return self.title

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user.email} - {self.product.title}"

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.email} - {self.product.title} - Quantity: {self.quantity}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='additional_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"{self.product.title} Image"